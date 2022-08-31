import request from "@/plugins/axios";

export function getSamplingData(params) {
  return request({
    url: "/samplingData",
    method: "get",
    // if have params, return the data filtered by ID in params
    params: params,
  });
}

export function postSamplingData(data) {
  return request({
    url: "/samplingData",
    method: "post",
    data: data,
  });
}

export function deleteSamplingData(data) {
  return request({
    url: "/samplingData",
    method: "delete",
    data: data,
  });
}

export function putSamplingData(data) {
  return request({
    url: "/samplingData",
    method: "put",
    data: data,
  });
}

export function getIsolationData() {
  return request({
    url: "/isolationData",
    method: "get",
  });
}

export function postIsolatedPointsData(data) {
  return request({
    url: "/isolationData/isolatedPointsData",
    method: "post",
    data: data,
  });
}

export function deleteAssignmentData(data) {
  return request({
    url: "/isolationData/assignmentData",
    method: "delete",
    data: data,
  });
}
