import request from "@/plugins/axios";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data,
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

export function modifyPassword(data){
  return request({
    url: "/user/password",
    method: "post",
    data,
  });
}

export function editInfo (data){
  return request({
    url: "/user/editInfo",
    method: "post",
    data,
  });

}

export function userRegister(data){
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}
