import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"


//to add project
export const register=async(data)=>{
   return await commonApi("POST",`${BASE_URL}/register`,data,'')
}

export const loginApi=async(data)=>{
   return await commonApi("POST",`${BASE_URL}/login`,data,'')
}

export const addProd=async(data,header)=>{
   return await commonApi("POST",`${BASE_URL}/addp`,data,header)
}

export const getallp=async(search)=>{
   return await commonApi("GET",`${BASE_URL}/getallp?search=${search}`,'','')
}

export const getallpp=async()=>{
   return await commonApi("GET",`${BASE_URL}/getallpadm`,'','')
}

export const delprod=async(id,header)=>{
   return await commonApi("DELETE",`${BASE_URL}/delprod/${id}`,{},header)
}

export const editprod=async(id,data,header)=>{
   return await commonApi("PUT",`${BASE_URL}/editp/${id}`,data,header)
}

export const userslist=async()=>{
   return await commonApi("GET",`${BASE_URL}/ulist`,'','')
}

export const editprofile=async(id,data,header)=>{
   return await commonApi("PUT",`${BASE_URL}/editprof/${id}`,data,header)
}

export const getUser=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/getusr/${id}`,'','')
}

export const Verifyem=async(data)=>{
   return await commonApi("PUT",`${BASE_URL}/verfem`,data,'')
}

export const changePass=async(id,data)=>{
   return await commonApi("PUT",`${BASE_URL}/changep/${id}`,data,'')
}

export const getPro=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/getprod/${id}`,'','')
}

export const getrelpro=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/relprod/${id}`,'','')
}

export const addcart=async(body)=>{
   return await commonApi("POST",`${BASE_URL}/addcart`,body,'')
}

export const getcart=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/cartlist/${id}`,'','')
}

//to delete cartitem
export const deletecartApi=async(id)=>{
   return await commonApi("DELETE",`${BASE_URL}/delcart/${id}`,{},'')
}

//to increase cart item
export const incrcart=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/inccart/${id}`,'','')
}

//to decrease cart item
export const decrcart=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/deccart/${id}`,'','')
}

//to get latest products
export const getLatestp=async()=>{
   return await commonApi("GET",`${BASE_URL}/latprod`,'','')
}


//to get latest products
export const getbestsell=async()=>{
   return await commonApi("GET",`${BASE_URL}/bestsell`,'','')
}

//to add to orderslist
export const addorder=async(data)=>{
   return await commonApi("POST",`${BASE_URL}/addorder`,data,'')
}

//to get orderslist
export const orderlist=async()=>{
   return await commonApi("GET",`${BASE_URL}/orderlist`,'','')
}

//to remove cart
export const deletecart=async(id)=>{
   return await commonApi("DELETE",`${BASE_URL}/cartdel/${id}`,{},'')
}

