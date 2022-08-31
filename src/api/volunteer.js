import request from "@/plugins/axios";

export function submitVolunteerApplication(ruleForm){
  return request({
        url: "/volunteerApplication",
        method: "post",
        data: ruleForm
    })
}
