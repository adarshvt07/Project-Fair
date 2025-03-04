import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import useruploadImg from '../assets/useruploadImg.png'
import SERVER_URL from '../services/severURL'
import { updateUserAPI } from '../services/allAPI'

const Profile = () => {

  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profilePic)
      setPreview("")
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic,open])

  const handleUpdateProfile = async()=>{
    const{username,password,github,linkedin,profilePic} = userDetails
    if(github && linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfileImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeaders = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try{
          const result = await updateUserAPI(reqBody,reqHeaders)
          if(result.status==200){
            alert("user profile upadted successfully")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);
            
          }
        }catch(err){
          console.log(err);
          
        }
      }
    }else{
      alert("please fill the form completely!!!")
    }
  }

  

  return (
    <>
     <div className='d-flex justify-content-evenly'>
      <h3 className='text-warning'>Profile</h3>
      <button onClick={() => setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
      </div> 

      <Collapse in={open}>
        <div id="example-collapse-text" className='row container-fluid aligin-items-center justify-content-center shadow p-2 rounded'>
          <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}}/>
            {
              existingProfileImg==""?
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:useruploadImg} alt="" />
              :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
            }
          </label>
          <div className='mb-2 w-100'>
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})}  type="text" placeholder='User Linkedin Profile Link' className='form-control'/>
          </div>
          <div className='mb-2 w-100'>
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='User Github Profile Link' className='form-control'/>
          </div>
          <div className='mb-2 w-100'>
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile
