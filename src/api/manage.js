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
