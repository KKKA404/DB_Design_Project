import axios from "axios";
axios.defaults.baseURL = "";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const service = axios.create({
  baseURL: "",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
  
);

service.interceptors.response.use(
  (response) => {
    // 这里可能后续会加上登录验证等措施，需要再添加代码
    return response;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service
