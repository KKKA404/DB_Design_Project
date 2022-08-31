import request from "@/plugins/axios";

export function addManageRecord(data){
    return request({
        url: "/manage",
        method: "post",
        data,
    })
}

// return UnManage Person Data judged by the UnitID in params
export function getUnManagePersonData(params){
    return request({
        url: "/unManagePersonData",
        method: "get",
        params
    })
}
