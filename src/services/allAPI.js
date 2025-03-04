import commonAPI from "./commonAPI";
import SERVER_URL from "./severURL";

//registerAPI called by Auth
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//loginAPI called by Auth when clicked on login button
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//addProjectAPI called by add when clicked on add-project button
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//gethomeProjectAPI called by home when page loads
export const getHomeProjectAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

//allProjectAPI called by project when page loads
export const allProjectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

//userProjectAPI called by view when page loads
export const userProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

//editProjectAPI called by edit when cliked on edit button
export const editProjectsAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//removeProjectAPI called by view when cliked on delete button
export const removeProjectsAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/${id}/remove`,{},reqHeader)
}

//updateUserAPI called by profile when cliked on update button
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}