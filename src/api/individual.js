import request from "@/plugins/axios";

export function submitPersonalRequest(data) {
  return request({
        url: "/personalRequest",
        method: "post",
        data: data,
    });
}