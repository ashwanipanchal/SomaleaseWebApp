import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { donation_details } from '../api/auth';
import { useLocation } from 'react-router-dom';
import ScreenLoader from '../components/LoaderButton/ScreenLoader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dollar from "../assets/img/funding.png"
import Duration from "../assets/img/duration.png"
import People from "../assets/img/allowed.png"
import Pin from "../assets/img/pin.png"
import VideoPlay from "../assets/img/videoplay.png"
import Modal from "react-bootstrap/Modal";

function DonationDetails() {

    const {state} = useLocation()
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState({});
    const [percentage, setPercentage] = useState(0);
    const [donationimage, setDonationImage] = useState([]);
    const [video, setVideo] = useState([]);
    const [donor, setDonor] = useState([]);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    useEffect(() => {
        getProperty();
      }, []);
    
      const getProperty = async () => {
        setLoading(true);
        const data = await donation_details({
            id: state,
          });
        setLoading(false);
        if (data.status) {
            console.log(data);
            setList(data.data);
            setDonor(data.data.donor_list);
            let f = parseFloat(
              parseFloat(data.data.till_funding) /
              parseFloat(data.data.total_funding),
            );
            setPercentage(f);
            
            setDonationImage(data.data.donations_image);
            setVideo(data.data.donations_video);
        }
      };
    
      if (loading) {
        return <ScreenLoader />;
      }

  return (
    <div>
        <Header/>
        <div style={{marginTop:"84px"}} className="slider-container">
            <div><a><img src={list?.image} style={{width:"100%", height:"400px"}} class="img-fluid mx-auto" alt="" /></a></div>
        </div>

        <section class="gray-simple" style={{marginTop:"-20px"}}>
				<div class="container">
					<div class="row">
						
						{/* <!-- property main detail --> */}
						<div class="col-lg-8 col-md-12 col-sm-12">
						
							<div class="property_block_wrap style-2 p-4">
								<div class="prt-detail-title-desc">
									{/* <span class="label text-light bg-success">For {list?.property_available == "2" ? "Sale" : "Rent"}</span> */}
									<h3>{list?.project_name}</h3>
									{/* <span><i class="lni-map-marker"></i> {list?.locality}</span> */}
									{/* <h3 class="prt-price-fix text-primary">{list.currency}{list.property_available == 1 ? list.expected_rent : list.selling_price}<sub>{list?.property_available == "1" && "/month"} </sub></h3>*/}
									<div style={{display:"flex", flexDirection:"column",}}>
										<div class="listing-card-info-icon" style={{marginBottom:"10px"}}>
											<div class="inc-fleat-icon me-1"><img src={Dollar} width="40" alt=""/></div><span style={{fontWeight:"bold"}}>{list?.total_funding} </span> &nbsp;Total Funding Required
										</div>
										<div class="listing-card-info-icon" style={{marginBottom:"10px"}}>
											<div class="inc-fleat-icon me-1"><img src={Duration} width="40" alt=""/></div><span style={{fontWeight:"bold"}}>{list?.duration} </span>&nbsp; Months Duration
										</div>
										<div class="listing-card-info-icon" style={{marginBottom:"10px"}}>
											<div class="inc-fleat-icon me-1"><img src={People} width="40" alt=""/></div><span style={{fontWeight:"bold"}}>{list?.people_allowed} </span>&nbsp; People Allowed
										</div>
										<div class="listing-card-info-icon" style={{marginBottom:"10px"}}>
											<div class="inc-fleat-icon me-1"><img src={Pin} width="40" alt=""/></div><span style={{fontWeight:"bold"}}>{list?.location} </span>&nbsp; Location
										</div>
									</div> 
								</div>
							</div>
							
							{/* <!-- Details and Feture Single Block Wrap --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#features" data-bs-target="#clOne" aria-controls="clOne" aria-expanded="false"><h4 class="property_block_title">Detail & Features</h4></a>
								</div>
								<div id="clOne" class="panel-collapse collapse show" aria-labelledby="clOne">
									<div class="block-body">
										<ul class="deatil_features">
											<li><strong>Bedrooms:</strong>{propertyDetail.beds} Beds</li>
											<li><strong>Bathrooms:</strong>{propertyDetail.bathrooms} Bath</li>
											<li><strong>Areas:</strong>{propertyDetail.propert_size}</li>
											<li><strong>Property Type:</strong>{propertyDetail.property_type}</li>
											<li><strong>Status:</strong>Active</li>
											
											
										</ul>
									</div>
								</div>
								
							</div> */}

							{/* <!-- Description Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#dsrp" data-bs-target="#clTwo" aria-controls="clTwo" aria-expanded="true"><h4 class="property_block_title">Description</h4></a>
								</div>
								<div id="clTwo" class="panel-collapse collapse show">
									<div class="block-body">
										<p>{list?.about}</p>
									</div>
								</div>
							</div>
							
							{/* <!-- Single Block Wrap --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#amen"  data-bs-target="#clThree" aria-controls="clThree" aria-expanded="true"><h4 class="property_block_title">Ameneties</h4></a>
								</div>
								
								<div id="clThree" class="panel-collapse collapse show">
									<div class="block-body">
										<ul class="avl-features third color">
											{propertyDetail?.amenitie_record?.map((i) => (
												<li>{i.name}</li>
											))}
										</ul>
									</div>
								</div>
							</div> */}
							
							{/* <!-- Single Block Wrap --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#vid"  data-bs-target="#clFour" aria-controls="clFour" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Property video</h4></a>
								</div>
								
								<div id="clFour" class="panel-collapse collapse">
									<div class="block-body">
										<div class="property_video">
											{propertyDetail?.propertie_video?.length == 0 ? 
											<>
												No Videos
											</> :
											 <div class="thumb">
												<img class="pro_img img-fluid w100" src="assets/img/pl-6.jpg" alt="7.jpg"/>
												<div class="overlay_icon">
													<div class="bb-video-box">
														<div class="bb-video-box-inner">
															<div class="bb-video-box-innerup">
																<a href="https://www.youtube.com/watch?v=A8EI6JaFbv4" data-bs-toggle="modal" data-bs-target="#popup-video" class="text-primary"><i class="fa-solid fa-play"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>}
										
										</div>
									</div>
								</div>
								
							</div> */}
						
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#loca"  data-bs-target="#clSix" aria-controls="clSix" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Location</h4></a>
								</div>
								
								<div id="clSix" class="panel-collapse collapse">
									<div class="block-body">
										<div class="map-container">
											<iframe
													style={{ height:450}}
													loading="lazy"
													allowfullscreen
													referrerpolicy="no-referrer-when-downgrade"
													src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk
														&q=${propertyDetail?.latitude},${propertyDetail?.longitude}`}>
													</iframe>
										</div>

									</div>
								</div>
								
							</div> */}
							
							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#clSev"  data-bs-target="#clSev" aria-controls="clOne" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Images</h4></a>
								</div>
								
								<div id="clSev" class="panel-collapse collapse">
									<div class="block-body">
										<ul class="list-gallery-inline">
											{donationimage?.map((i) => (
												<li style={{cursor:"pointer"}}>
													<a href={i.image} target='blank' class="mfp-gallery"><img src={i.image} class="img-fluid mx-auto" alt="" /></a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>							
							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#clSev1"  data-bs-target="#clSev1" aria-controls="clOne" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Video</h4></a>
								</div>
								
								<div id="clSev1" class="panel-collapse collapse">
									<div class="block-body">
										<ul class="list-gallery-inline">
											{video?.map((i) => (
												<li style={{cursor:"pointer"}}>
													<a href={i.image} target='blank' class="mfp-gallery"><img src={VideoPlay} class="img-fluid mx-auto" alt="" /></a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>							
						</div>
						
						{/* <!-- property Sidebar --> */}
						<div class="col-lg-4 col-md-12 col-sm-12">


							<div class="like_share_wrap b-0">
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <label>${list?.till_funding?.toFixed(2)} of ${list?.total_funding} funded</label>
                                    <label>{parseFloat(percentage * 100).toFixed(1)} %</label>
                                </div>
                                {/* <progress style={{width:"100%", marginTop:"8px"}} value={}/> */}
                                <ProgressBar style={{marginTop:"10px"}} animated variant="danger" now={percentage}/>
                                <div class="form-group">
									<label>{donor?.length} Donated</label>
                                    <br/>
                                    {donor?.map((i) => (
                                        <img onClick={() => showModal1()} src={i.user_image} style={{height:"30px", width:"30px", marginRight:"10px", borderRadius:"15px", marginTop:"10px", cursor:"pointer"}}/>
                                    ))}
								</div>
								<ul class="like_share_list">
									<li><a onClick={() => {}} class="btn btn-likes" data-toggle="tooltip" data-original-title="Share">Participate Now</a></li>
									<li><a class="btn btn-likes" data-toggle="tooltip" data-original-title="Save">Audio Space</a></li>
								</ul>
							</div>
							
							
						</div>
						
					</div>
				</div>
			</section>
        <Footer/>
        <Modal show={showHello1} onHide={closeModal1}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Contributors</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: "1.5em"}}>
          <div>
            <div style={{display:"flex", flexDirection:"column"}}>

            {donor?.map((i) => (
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", alignContent:"center", paddingBottom:"14px"}}>
                    <img src={i.user_image} style={{height:"30px", width:"30px", marginRight:"10px", borderRadius:"15px", cursor:"pointer"}}/>
                    <p style={{marginBottom:0}}>{i.user_name}</p>
                </div>
                ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

        <Modal show={showHello2} onHide={closeModal2}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Contributors</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: "1.5em"}}>
          <div>
            <div style={{display:"flex", flexDirection:"column"}}>

            {donor?.map((i) => (
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", alignContent:"center", paddingBottom:"14px"}}>
                    <img src={i.user_image} style={{height:"30px", width:"30px", marginRight:"10px", borderRadius:"15px", cursor:"pointer"}}/>
                    <p style={{marginBottom:0}}>{i.user_name}</p>
                </div>
                ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DonationDetails