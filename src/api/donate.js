import request from "@/plugins/axios";

export function getDonateData() {
  return request({
    url: "/donateData",
    method: "get",
  });
}

export function postDonateData(data) {
  return request({
    url: "/donateData",
    method: "post",
    data: data,
  });
}
