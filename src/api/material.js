import request from "@/plugins/axios";
//获取物流信息
export function getTransportData(){
    return request({
        url: "/transportData",
        method: "get"
    })
}
//获取现有物资数据
export function getExistingMaterials(){
    return request({
        url: "/existingMaterial",
        method: "get"
    })
}
