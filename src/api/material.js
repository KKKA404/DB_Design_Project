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

export function getNeedData() {
  return request({
    url: "/needData",
    method: "get",
  });
}

export function deleteNeedData(data) {
  return request({
    url: "/needData",
    method: "delete",
    data,
  });
}

export function getPurchaseData() {
  return request({
    url: "/purchaseData",
    method: "get",
  });
}

export function submitUnitPurchase(data) {
  return request({
    url: "/purchaseData/unitPurchase",
    method: "post",
    data,
  });
}

export function submitDonorPurchase(data) {
  return request({
    url: "/purchaseData/donorPurchase",
    method: "post",
    data,
  });
}
