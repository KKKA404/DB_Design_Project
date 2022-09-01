import request from "@/plugins/axios";

//新增病例记录
export function addPatientData(data) {
  return request({
    url: "/PatientRecord",
    method: "post",
    data,
  });
}
export function getSamplingData() {
  return request({
    url: "/samplingData",
    method: "get",
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
