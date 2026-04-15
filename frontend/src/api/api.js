export const BASE_URL = "http://127.0.0.1:8000/api/v1";

export function getToken(){
    return localStorage.getItem("access");
}

export function getRefreshToken() {
    return localStorage.getItem("refresh");
}

export function setToken(token){
    return localStorage.setItem("access", token);
}

export function setTokens(access, refresh) {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
}

export function clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
}

export function logout(){
    clearTokens();
    window.location.href = "/login";
}

async function refreshAccessToken() {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    const res = await fetch(`${BASE_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
        clearTokens();
        return null;
    }

    const data = await res.json();
    if (!data.access) {
        clearTokens();
        return null;
    }

    setToken(data.access);
    return data.access;
}

export async function authFetch(path, options = {}) {
    const headers = {
        ...(options.headers || {}),
    };

    const access = getToken();
    if (access) {
        headers.Authorization = `Bearer ${access}`;
    }

    let response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (response.status !== 401) return response;

    const refreshedAccess = await refreshAccessToken();
    if (!refreshedAccess) {
        return response;
    }

    const retryHeaders = {
        ...(options.headers || {}),
        Authorization: `Bearer ${refreshedAccess}`,
    };

    response = await fetch(`${BASE_URL}${path}`, { ...options, headers: retryHeaders });
    return response;
}
