import { get } from "../utils/request"

const api ={
    getDataInfo(params){
        return get("http://api.tianapi.com/ncov/index",params);
    }
}

export default api;