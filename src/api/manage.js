import request from "@/plugins/axios";

export function addManageRecord(data){
    return request({
        url: "/manage",
        method: "post",
        data,
    })
}

