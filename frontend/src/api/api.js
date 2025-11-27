export const BASE_URL = "http://127.0.0.1:8000/api/v1";

export function getToken(){
    return localStorage.getItem("access");
}

export function setToken(token){
    return localStorage.setItem("access", token);
}

export function logout(){
    localStorage.removeItem("access");
    window.location.href = "/login";
}