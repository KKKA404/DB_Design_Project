import request from "@/plugins/axios";

//新增病例记录
export function addPatientData(data)
{
    return request({
        url: "/PatientRecord",
        method: "post",
        data
    })

}