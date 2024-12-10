import React, { useEffect, useState } from 'react'
import C6 from '../../assets/img/p-6.jpg'
import { broadcast_home_builder } from '../../api/auth';
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import { useNavigate } from 'react-router-dom';
const MyCodkar = () => {  
	const navigate = useNavigate()
  const [live, setLive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(false);
    const aa = ["","",""]

    useEffect(() => {
      getStaff();
    }, []);
  
    const getStaff = async () => {
        const user_id = localStorage.getItem("user_id");
        setLoading(true)
      const res = await broadcast_home_builder({
        user_id: user_id.toString(),
      });
      setLoading(false)
      if (res.status) {
        console.log(res)
        setLive(res.live);
        setUpcoming(res.upcoming);
        setPast(res.past);
      }
    };


    if(loading){
      return(
          <ScreenLoader/>
      )
  }

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} class="form-submit">	
      <h4>Upcoming Codkar</h4>
      {/* <p style={{textDecoration:"underline", cursor:"pointer"}}>View All</p> */}
      <button onClick={() => navigate("/my_account/builder/add_builder_events")} style={{marginBottom:'20px', backgroundColor:'#DC2F2E'}}>+ Add Event</button>
    </div>

    <div className='row'>
        <div class="row justify-content-center">
								
								{upcoming?.map((item, index) => (

								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div class="property-listing card border-0 rounded-3">
									
									<div class="listing-img-wrapper p-3">
										<div class="list-img-slide position-relative">
											<div class="click rounded-3 overflow-hidden mb-0">
											{/* <div><img style={{height:240}} src={item?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" /></div> */}
												{/* {/* <div><a href="single-property-1.html"><img src="assets/img/p-9.jpg" class="img-fluid" alt="" /></a></div> */}
												<div><a href="single-property-1.html"><img style={{height:210, width:325}} src={item.image} class="img-fluid" alt="" /></a></div>
											</div>
										</div>
									</div>
									
									<div class="listing-caption-wrapper px-3">
										<div class="listing-detail-wrapper">
											<div class="listing-short-detail-wrap">
												<div class="listing-short-detail">
													<h6 style={{cursor:'pointer'}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="listing-name fw-semibold fs-8 mb-1">{item.title}</h6>
													<p style={{cursor:'pointer', color:"#DC2F2E"}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="fs-10 mb-1">{item.start_time}</p>
												</div>
											</div>
										</div>
										
									
									</div>
									
								</div>
							</div>
								))}
							
							</div>
              </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} class="form-submit">	
      <h4>Ongoing Codkar</h4>
      {/* <p style={{textDecoration:"underline", cursor:"pointer"}}>View All</p> */}
      {/* <button onClick={() => navigate("/my_account/builder/add_staff_builder")} style={{marginBottom:'20px', backgroundColor:'#DC2F2E'}}>+</button> */}
    </div>

      <div className='row'>
        <div class="row justify-content-center">
								
								{live?.map((item, index) => (

								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div class="property-listing card border-0 rounded-3">
									
									<div class="listing-img-wrapper p-3">
										<div class="list-img-slide position-relative">
											<div class="click rounded-3 overflow-hidden mb-0">
											{/* <div><img style={{height:240}} src={item?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" /></div> */}
												{/* {/* <div><a href="single-property-1.html"><img src="assets/img/p-9.jpg" class="img-fluid" alt="" /></a></div> */}
												<div><a href="single-property-1.html"><img style={{height:210, width:325}} src={item.image} class="img-fluid" alt="" /></a></div>
											</div>
										</div>
									</div>
									
									<div class="listing-caption-wrapper px-3">
										<div class="listing-detail-wrapper">
											<div class="listing-short-detail-wrap">
												<div class="listing-short-detail">
													<h6 style={{cursor:'pointer'}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="listing-name fw-semibold fs-8 mb-1">{item.title}</h6>
													<p style={{cursor:'pointer', color:"#DC2F2E"}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="fs-10 mb-1">{item.start_time}</p>
												</div>
											</div>
										</div>
										
									
									</div>
									
								</div>
							</div>
								))}
							
							</div>
              </div>


              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} class="form-submit">	
      <h4>Past Codkar</h4>
      {/* <p style={{textDecoration:"underline", cursor:"pointer"}}>View All</p> */}
      {/* <button onClick={() => navigate("/my_account/builder/add_staff_builder")} style={{marginBottom:'20px', backgroundColor:'#DC2F2E'}}>+</button> */}
    </div>

      <div className='row'>
        <div class="row justify-content-center">
								
								{past?.map((item, index) => (

								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div class="property-listing card border-0 rounded-3">
									
									<div class="listing-img-wrapper p-3">
										<div class="list-img-slide position-relative">
											<div class="click rounded-3 overflow-hidden mb-0">
											{/* <div><img style={{height:240}} src={item?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" /></div> */}
												{/* {/* <div><a href="single-property-1.html"><img src="assets/img/p-9.jpg" class="img-fluid" alt="" /></a></div> */}
												<div><a href="single-property-1.html"><img style={{height:210, width:325}} src={item.image} class="img-fluid" alt="" /></a></div>
											</div>
										</div>
									</div>
									
									<div class="listing-caption-wrapper px-3">
										<div class="listing-detail-wrapper">
											<div class="listing-short-detail-wrap">
												<div class="listing-short-detail">
													<h6 style={{cursor:'pointer'}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="listing-name fw-semibold fs-8 mb-1">{item.title}</h6>
													<p style={{cursor:'pointer', color:"#DC2F2E"}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="fs-10 mb-1">{item.start_time}</p>
												</div>
											</div>
										</div>
										
									
									</div>
									
								</div>
							</div>
								))}
							
							</div>
              </div>
  </>
  )
}

export default MyCodkar