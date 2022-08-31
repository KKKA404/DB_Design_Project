import request from "@/plugins/axios";

export function submitVolunteerApplication(ruleForm){
  return request({
        url: "/volunteerApplication",
        method: "post",
        data: ruleForm
    })
}

export function getVolunteerRecord(params){
  return request({
        url: "/volunteerApplication",
        method: "get",
        params:params,
    })
}
export function deleteVolunteerRecord(data){
  return request({
        url: "/volunteerApplication",
        method: "delete",
        data,
    })
}
export function modifyVolunteerRecord(data){
  return request({
        url: "/volunteerApplication",
        method: "put",
        data,
    })
}


