import axios from "axios"
import qs from "qs"
 
//处理错误信息的方法

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义有误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("地址错误");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break;
    }
}
 
//创建实例
const instance = axios.create({
    timeout: 5000,
    //baseURL: "http://iwenwiki.com"
});

instance.all=axios.all;
instance.spread=axios.spread;

instance.defaults.headers.post['Content-type']='application/x-www-form-urlencoded';
 
 
/**
 * 拦截器
 */
//1.请求拦截
instance.interceptors.request.use(
    config => {
        //判断请求方式
        if (config.method === "post") {
            //数据转换
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    //请求失败
    error => Promise.reject(error)
)
 
//2.响应拦截
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        if(response){
            errorHandle(response.status, response.info);
            return Promise.reject(response);
        }
        else{
            console.log("请求被中断");
        }
        
    }
)

export function get(url,params){
    return new Promise((resolve,reject)=>{
        instance.get(url,{
            params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        })
    })
}

export function post(url,params){
    return new Promise((resolve,reject)=>{
        instance.post(url,params).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}
 
 
//导出
export default instance;