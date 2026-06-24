import { buildApiUrl } from "../api/config";
import {
  clearAuthTokens,
  getIsAdmin,
  getIsNewUser,
  isAuthenticated,
  setAuthTokens,
} from "./token-storage";

interface CheckCodeResponse {
  status?: string;
  access_token?: string;
  refresh_token?: string;
  is_new_user?: boolean;
  user_id?: number;
}

interface SendCodeResponse {
  message?: string;
}

export async function sendAuthCode(phone: string): Promise<SendCodeResponse> {
  const response = await fetch(
    `${buildApiUrl("/api/public/auth/send-code")}?${new URLSearchParams({ phone }).toString()}`,
  );

  if (!response.ok) {
    throw new Error("Не удалось отправить код");
  }

  return response.json();
}

interface ProfileResponse {
  is_admin?: boolean;
}

export async function loginWithCode(
  phone: string,
  code: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const response = await fetch(buildApiUrl("/api/public/auth/check-code"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  });

  if (!response.ok) {
    return { ok: false, error: "Неверный код. Попробуйте еще раз" };
  }

  const data = (await response.json()) as CheckCodeResponse;

  if (data.status !== "ok" || !data.access_token || !data.refresh_token) {
    return { ok: false, error: "Неверный код. Попробуйте еще раз" };
  }

  let isAdmin = false;

  try {
    const profileResponse = await fetch(buildApiUrl("/api/public/profile"), {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (profileResponse.ok) {
      const profile = (await profileResponse.json()) as ProfileResponse;
      isAdmin = Boolean(profile.is_admin);
    }
  } catch {
    isAdmin = false;
  }

  setAuthTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    isAdmin,
    isNewUser: Boolean(data.is_new_user),
    userId: data.user_id ?? 0,
  });

  return { ok: true };
}

export function logout(): void {
  clearAuthTokens();
  window.location.href = "/";
}

export function getAuthState() {
  return {
    isAuthenticated: isAuthenticated(),
    isAdmin: getIsAdmin(),
    isNewUser: getIsNewUser(),
  };
}
