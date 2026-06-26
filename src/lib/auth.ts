import type { LoginCredentials, LoginResponse } from "@/types/auth";

export const AUTH_TOKEN_KEY = "austro_pos_token";

const MOCK_CREDENTIALS: LoginCredentials = {
  email: "admin@austropos.cl",
  password: "admin123",
};

const MOCK_RESPONSE: LoginResponse = {
  token: "mock-token",
  user: {
    id: 1,
    name: "Administrador",
    email: "admin@austropos.cl",
    role: "admin",
    company_id: 1,
  },
};

function isMockAuthEnabled() {
  return process.env.NEXT_PUBLIC_AUTH_MOCK === "true";
}

function isBrowser() {
  return typeof window !== "undefined";
}

function setAuthCookie(token: string) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=86400; samesite=lax`;
}

function removeAuthCookie() {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
}

export function saveToken(token: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  setAuthCookie(token);
}

export function getToken() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function removeToken() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  removeAuthCookie();
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  if (isMockAuthEnabled()) {
    const isValidMockUser =
      credentials.email === MOCK_CREDENTIALS.email &&
      credentials.password === MOCK_CREDENTIALS.password;

    if (!isValidMockUser) {
      throw new Error("Credenciales invalidas");
    }

    saveToken(MOCK_RESPONSE.token);

    return MOCK_RESPONSE;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL no esta configurada");
  }

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  let data: LoginResponse | { message?: string } | null = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data && "message" in data && data.message
        ? data.message
        : "Credenciales invalidas";

    throw new Error(message);
  }

  const loginResponse = data as LoginResponse;

  saveToken(loginResponse.token);

  return loginResponse;
}

export function logout() {
  removeToken();
}
