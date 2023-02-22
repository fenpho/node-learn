import axios from "axios"

const http = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
  // 自定义请求头
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data?.code !== 200) {
    alert(response.data.message)
  }

  return Promise.resolve(response.data);
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});

http.request = (type, url, params = {}) => {
  if (type === 'get') {
    let newUrl = `${url}?`

    for (const key in params) {
      newUrl += `${key}=${params[key]}`
    }
    return http.get(newUrl)
  } else if (type === 'post') {
    return http.post(url, params) 
  }
}

export default http