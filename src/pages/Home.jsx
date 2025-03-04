import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImg from '../assets/landingImg.jpg'
import test from '../assets/test.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'



const Home = () => {
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    getAllHomeProjects()
  },[])

  const getAllHomeProjects = async()=>{
    try{
      const result = await getHomeProjectAPI()
      setHomeProjects(result.data)
    }catch(err){
      console.log(err);
      
    }
  }

  const handleProjects = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("please login to get full to our projects!!!")
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: '80px' }}><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <p style={{ textAlign: 'justify' }}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur dolorum nihil ducimus ipsam, saepe dolore? Aperiam tempore perspiciatis ratione natus provident quibusdam voluptatem illo ex sint, quod ut eligendi pariatur!
              </p>
              {
                sessionStorage.getItem("token")?
                <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS!!!</Link>
                :
                <Link to={'/login'} className='btn btn-warning'>STARTS TO EXPLORE</Link>
              }
            </div>
            <div className='col-lg-6'>
              <img className='img-fluid' src={landingImg} alt="landing" />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <h1 className='mb-2'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {
              homeProjects?.map(project=>(
                <div className='me-5'>
              <ProjectCard displayData={project}/>
            </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5'>Click Here to View More Projects...</button>
      </div>

      <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
        <h1>Our Testimonials</h1>
        <div className='d-flex align-items-center justify-content-evenly mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={test} alt="" />
              <span>Max Willer</span>
              </Card.Title>
              <div className='d-flex justify-content-center mb-1'>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
              </div>
              <Card.Text>
                <p style={{textAlign:'justify'}}>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={test} alt="" />
              <span>Max Willer</span>
              </Card.Title>
              <div className='d-flex justify-content-center mb-1'>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
              </div>
              <Card.Text>
                <p style={{textAlign:'justify'}}>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={test} alt="" />
              <span>Max Willer</span>
              </Card.Title>
              <div className='d-flex justify-content-center mb-1'>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
                <i className='fa-solid fa-star text-warning'></i>
              </div>
              <Card.Text>
                <p style={{textAlign:'justify'}}>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home
