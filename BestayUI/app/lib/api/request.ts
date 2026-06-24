import { clearAuthTokens, getAccessToken } from "../auth/token-storage";
import { errorToast, successToast } from "../toasts";
import { buildApiUrl } from "./config";

interface ApiErrorResponse {
  detail?: string;
  error?: { code: number; message: string };
}

function redirectToLogin(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
}

async function parseResponseBody<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

async function request<T extends object | string>(
  path: string,
  config?: RequestInit & { auth?: boolean },
): Promise<T & ApiErrorResponse> {
  const headers = new Headers(config?.headers);
  const useAuth = config?.auth ?? true;

  if (useAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  }

  if (
    config?.body &&
    !(config.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...config,
    headers,
  });

  if (response.status === 401 && useAuth) {
    clearAuthTokens();
    redirectToLogin();
    throw new Error("Требуется авторизация");
  }

  const data = await parseResponseBody<T & ApiErrorResponse>(response);

  if (!response.ok) {
    const message =
      data.error?.message ||
      data.detail ||
      "Попробуйте повторить запрос позже";
    throw new Error(message);
  }

  return data;
}

export async function requestData<T extends object | string>(
  path: string,
  config?: RequestInit & { auth?: boolean },
): Promise<T> {
  try {
    const data = await request<T>(path, config);

    if (config?.next?.tags?.includes("notify")) {
      successToast();
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      errorToast(error.message);
    }
    throw error;
  }
}
