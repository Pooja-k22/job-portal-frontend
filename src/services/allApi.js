import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register api
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

// login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

// job post api
export const PostJobApi= async (reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/job-add`, reqBody,reqHeader)
}

// job get All api
export const getJobApi= async (searchKey)=>{
    return await commonApi('GET',`${serverUrl}/job-get?search=${searchKey}`)
}

// job get employer All api
export const getEmployerJobApi= async ()=>{
    return await commonApi('GET',`${serverUrl}/job-emp-get`)
}

// job get A job api
export const getAJobApi= async (id)=>{
    return await commonApi('GET',`${serverUrl}/job-get-one/${id}`)
}

// edit job api
export const UpdateJobApi= async (id, reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/job-edit/${id}`,reqBody)
}

// delete job
export const deleteJobApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-job/${id}`)
}

// toogle status
export const UpdateJobstatusApi= async (id, reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/job-status/${id}`,reqBody)
}

// apply job post
export const addapplicationApi= async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/apply-job`, reqBody)
}

// get emp application
export const getEmpApplicationApi= async (reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/emp-application`,"",reqHeader)
}

// get user list
export const getUserListApi= async ()=>{
    return await commonApi('GET',`${serverUrl}/user`)
}

// edit profile
export const profileEditApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT', `${serverUrl}/profile-edit`, reqBody,reqHeader)
}


// get user

export const getUserApi= async (reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-details`,"", reqHeader)}

    // get home job
    export const getHomeJob= async ()=>{
    return await commonApi('GET',`${serverUrl}/latest-jobs`)}