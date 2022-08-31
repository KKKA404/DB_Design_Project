import request from "@/plugins/axios";

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
