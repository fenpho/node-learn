import http from "@/utils/axios"

export function register(data) {
  return http.request('post', 'register', { ...data })
}

export function login(data) {
  return http.request('post', 'login', { ...data })
}

export function sendMessage(data) {
  return http.request('post', 'sendMessage', { ...data })
}

export function getMessage(data) {
  return http.request('get', 'getMessage', { ...data })
}
