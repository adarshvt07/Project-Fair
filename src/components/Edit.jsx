import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/uploadImg.png'
import SERVER_URL from '../services/severURL';
import { editProjectsAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextApi';


const Edit = ({project}) => {
  const {editProjectResponse,setEditProjectResponse} = useContext(editResponseContext)
  
    const [show, setShow] = useState(false);

    const [preview,setPreview] = useState("")
    const [imageFileStatus,setImageFileStatus] = useState(false)
    const [projectDetails,setProjectDetails] = useState({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImg:""
    })
    console.log(projectDetails);

    useEffect(()=>{
        if(projectDetails.projectImg.type=='image/png' || projectDetails.projectImg.type=='image/jpg' || projectDetails.projectImg.type=='image/jpeg'){
          // valid image
          setImageFileStatus(true)
          setPreview(URL.createObjectURL(projectDetails.projectImg))
        }else{
          // invalid image
          setImageFileStatus(false)
          setPreview("")
          setProjectDetails({...projectDetails,projectImg:""})
        }
    },[projectDetails.projectImg])
  
    const handleClose = () => {
      setShow(false);
      setProjectDetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImg:""
      })
    }

    const handleShow = () => {
      setShow(true);
      setProjectDetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImg:""
    })
    }

  const handleUpdateProject = async()=>{
    const {id,title,languages,overview,github,website,projectImg} = projectDetails
    if(title && languages && overview && github && website){
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview? reqBody.append("projectImg",projectImg) : reqBody.append("projectImg",project.projectImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeaders = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await editProjectsAPI(id,reqBody,reqHeaders)
          if(result.status==200){
            alert("peoject added sucessfully!!!")
            handleClose()
            setEditProjectResponse(result)
          }
        }catch(err){
          console.log(err);
          
        }
      }
    }else{
      alert("please fill the form completly")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn'><i className='fa-solid fa-edit'></i></button>

      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details!!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className='row align-items-center'>
               <div className='col-lg-4'>
                 <label>
                   <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})}/>
                   <img height={'200px'} className='img-fluid rounded' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
                 </label>
                 { !imageFileStatus &&
                   <div className='text-warning fw-bolder my-2'>*Upload Only the Following File Types (jpg,jpeg,png) Here!!!!</div>
                 }
               </div>
               <div className='col-lg-8'>
                 <div className='mb-2'>
                   <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className='form-control' placeholder='Project Title' />
                 </div>
                 <div className='mb-2'>
                   <input value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} type="text" className='form-control' placeholder='Language used in Project' />
                 </div>
                 <div className='mb-2'>
                   <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className='form-control' placeholder='Project Overview' />
                 </div>
                 <div className='mb-2'>
                   <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" className='form-control' placeholder='Project Github' />
                 </div>
                 <div className='mb-2'>
                   <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className='form-control' placeholder='Project Website Link' />
                 </div>
               </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit
