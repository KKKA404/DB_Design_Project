import request from "@/plugins/axios";

export function deletePersonalRequest(personId) {
  return request({
    url: "/personalRequest",
    method: "delete",
    data: personId,
  });
}

export function modifyPersonalRequest(data) {
  return request({
    url: "/personalRequest",
    method: "put",
    data,
  });
}
//edit中调用
// export function getOriginRequest(params) {
//   return request({
//     url: "/personalRequest",
//     method: "get",
//     params: params,
//   });
// }

export function getPersonalRequest(params) {
  return request({

    url: "/personalRequest/" + params,
    method: "get",
    params: params

  });
}

// export function getPersonalRequest(params) {
//   return request({
//     url: "/personalRequest/",
//     method: "get",
//     params,
//   });
// }

export function submitPersonalRequest(data) {
  return request({
    url: "/personalRequest",
    method: "post",
    data: data,
  });
}
