export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
  isNewUser: boolean;
  userId: number;
}

const ACCESS_TOKEN_KEY = "bestway_access_token";
const REFRESH_TOKEN_KEY = "bestway_refresh_token";
const IS_ADMIN_KEY = "bestway_is_admin";
const IS_NEW_USER_KEY = "bestway_is_new_user";
const USER_ID_KEY = "bestway_user_id";

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!canUseStorage()) {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!canUseStorage()) {
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getIsAdmin(): boolean {
  if (!canUseStorage()) {
    return false;
  }
  return localStorage.getItem(IS_ADMIN_KEY) === "true";
}

export function getIsNewUser(): boolean {
  if (!canUseStorage()) {
    return false;
  }
  return localStorage.getItem(IS_NEW_USER_KEY) === "true";
}

export function getUserId(): number | null {
  if (!canUseStorage()) {
    return null;
  }
  const userId = localStorage.getItem(USER_ID_KEY);
  return userId ? Number(userId) : null;
}

export function setAuthTokens(tokens: AuthTokens): void {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(IS_ADMIN_KEY, String(tokens.isAdmin));
  localStorage.setItem(IS_NEW_USER_KEY, String(tokens.isNewUser));
  localStorage.setItem(USER_ID_KEY, String(tokens.userId));
}

export function clearAuthTokens(): void {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(IS_ADMIN_KEY);
  localStorage.removeItem(IS_NEW_USER_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function updateAuthProfileMeta(data: {
  isAdmin: boolean;
  userId: number;
}): void {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(IS_ADMIN_KEY, String(data.isAdmin));
  localStorage.setItem(USER_ID_KEY, String(data.userId));
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
