import axios from 'axios';
import { history } from '../index';
import { isExpired, decodeToken } from 'react-jwt';

export const USER_LOGIN = 'userLogin';
export const TOKEN = 'accessToken';
export const TOKEN_CYBER =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIzMS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODU0OTEyMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NTYzODgwMH0.LWlPoCoXPHgp2U6FijTqXvKFt7ENvY9Tyn9ux-bVlXo';

//các hàm sử dụng để lưu
export const {
  setStore,
  setStoreJson,
  getStore,
  getStoreJson,
  eraseStore,
  setCookie,
  getCookie,
  eraseCookie,
} = {
  setStore: (name, data) => {
    localStorage.setItem(name, data);
  },
  setStoreJson: (name, jsonData) => {
    const data = JSON.stringify(jsonData);
    localStorage.setItem(name, data);
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
  },
  eraseStore: (name) => {
    localStorage.removeItem(name);
  },
  setCookie: (name, value, days) => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: (name) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
};

//Cấu hình interceptor (Cấu hình cho tất cả Request (Dữ liệu gửi đi), Response (Dữ liệu nhận về))

export const http = axios.create({
  baseURL: 'https://shop.cyberlearn.vn',
  timeout: 30000,
});

//Cấu hình cho resquest đều có token
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${getCookie(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBER,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//Cấu hình cho tất cả các response api
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response);
    //Bắt lỗi 400 hoặc 404
    if (err.response?.status === 400 || err.response?.status === 404) {
      //Lỗi do tham số => backend trả về 400 hoặc 404 mình sẽ xử lý
      alert('tham số không hợp lệ!');
      //chuyển hướng về home
      history.push('/');
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
      const isMyTokenExpired = isExpired(getStore(TOKEN));
      //token hết hạn
      if (isMyTokenExpired) {
        alert('Hết phiên đăng nhập yêu cầu đăng nhập lại!');
        eraseStore(TOKEN);
        eraseStore(USER_LOGIN);
        //Chuyển hướng trang dạng f5
        window.location.href = '/login';
      }
      history.push('/login');
    }
    return Promise.reject(err);
  }
);
