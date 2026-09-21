const API_URL = import.meta.env.VITE_API_URL;
const SESSION_KEY = "pitstop-auth-session";

const getStorage = (rememberMe) =>
  rememberMe ? window.localStorage : window.sessionStorage;

const requestAuth = async (path, body) => {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Authentication request failed.");
  }

  return payload.data;
};

export const signUp = ({ fullName, email, password }) =>
  requestAuth("signup", { fullName, email, password });

export const signIn = ({ email, password }) =>
  requestAuth("login", { email, password });

export const saveSession = (session, rememberMe) => {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  getStorage(rememberMe).setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("pitstop-auth-changed"));
};

export const getSession = () => {
  const storedSession =
    window.localStorage.getItem(SESSION_KEY) ||
    window.sessionStorage.getItem(SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession);
  } catch {
    clearSession();
    return null;
  }
};

export const clearSession = () => {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("pitstop-auth-changed"));
};
