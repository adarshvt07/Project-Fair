import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectsAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'

const Projects = () => {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  const [searchKey, setSearchKey] = useState("")
  const [allProjects, setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setIsAuthorized(true)
    }else{
      setIsAuthorized(false)
    }
    getAllProjects()
  }, [searchKey])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeaders = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allProjectsAPI(searchKey, reqHeaders)
        if (result.status == 200) {
          setAllProjects(result.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Projects by their Lnaguage' type="text" className='form-control w-25' />
        </div>

        <Row className='mt-3'>
          {
            allProjects?.length > 0 ?
              allProjects?.map(project => (
                <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
                  <ProjectCard displayData={project}/>
                </Col>
              ))
              :
              <div className='text-danger fw-bolder'>Projects not found!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects
