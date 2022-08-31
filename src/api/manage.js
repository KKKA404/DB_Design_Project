import request from "@/plugins/axios";

export function addManageRecord(data){
    return request({
        url: "/manage",
        method: "post",
        data,
    })
}

export function deleteManageRecord(data){
    return request({
        url: "/manage",
        method: "delete",
        data,
    })

}

export function getManageRecord(params){
    return request({
        url: "/manage",
        method: "get",
        params:params,
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
