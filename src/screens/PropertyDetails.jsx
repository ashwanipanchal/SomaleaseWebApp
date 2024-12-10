import React,{useState, useEffect} from 'react'
import bed from '../assets/img/bed.svg'
import bathtub from '../assets/img/bathtub.svg'
import move from '../assets/img/move.svg'
import C1 from '../assets/img/p-1.jpg'
import C2 from '../assets/img/p-2.jpg'
import C3 from '../assets/img/p-3.jpg'
import C4 from '../assets/img/p-4.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from 'react-router-dom'
import { property_details } from '../api/auth'
import Loader from '../components/Loader'
import Collapsible from 'react-collapsible';
import Footer from '../components/Footer'
import Header from '../components/Header'

function PropertyDetails() {
	let { user_id ,id } = useParams();
	const [loading, setLoading] = useState(false);
	const [propertyDetail, setPropertyDetail] = useState({});

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
      };

      const [isOpen, setIsOpen] = useState(false);

      const toggleCollapse = () => {
        setIsOpen(!isOpen);
      };


	  useEffect(() => {
		getProperies()
	},[])

	const getProperies = async() => {
		setLoading(true)
		const res = await property_details({
			id: id,
			user_id: user_id,
		  })
		if(res.status){
			setLoading(false)
			setPropertyDetail(res.data)
			console.log(res)
			// if(type == "sales"){
			// 	setAllProperties(res.sale_propertie);
			// }
			// if(type == "rent"){
			// 	setAllProperties(res.rent_propertie);
			// }
		}
	}


  return (
    <>
			{/* <Header/> */}
			{loading ? 
				<Loader/>
				:
				<>

                <div className="slider-container">
                <Slider {...settings}>
					{propertyDetail?.propertie_image?.map((i, index) => {
						return(
						<div><a  ><img src={i?.gallery_image} class="img-fluid mx-auto" alt="" /></a></div>
					)})}
					
                </Slider>
                </div>

{/* <!-- ============================ Hero Banner  Start================================== --> */}
			{/* <div class="featured_slick_gallery gray">
				<div class="featured_slick_gallery-slide">
					<div class="featured_slick_padd"><a href="assets/img/p-1.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a></div>
					<div class="featured_slick_padd"><a href="assets/img/p-2.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a></div>
					<div class="featured_slick_padd"><a href="assets/img/p-3.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a></div>
					<div class="featured_slick_padd"><a href="assets/img/p-4.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a></div>
				</div>
			</div> */}
			{/* <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div> */}
			{/* <!-- ============================ Hero Banner End ================================== --> */}


        	{/* <!-- ============================ Property Detail Start ================================== --> */}
			<section class="gray-simple">
				<div class="container">
					<div class="row">
						
						{/* <!-- property main detail --> */}
						<div class="col-lg-8 col-md-12 col-sm-12">
						
							<div class="property_block_wrap style-2 p-4">
								<div class="prt-detail-title-desc">
									<span class="label text-light bg-success">For {propertyDetail?.property_available == "2" ? "Sale" : "Rent"}</span>
									<h3>{propertyDetail?.apartment_name}</h3>
									<span><i class="lni-map-marker"></i> {propertyDetail?.locality}</span>
									<h3 class="prt-price-fix text-primary">{propertyDetail.currency}{propertyDetail.property_available == 1 ? propertyDetail.expected_rent : propertyDetail.selling_price}<sub>{propertyDetail?.property_available == "1" && "/month"} </sub></h3>
									<div class="list-fx-features">
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={bed} width="13" alt=""/></div>{propertyDetail.beds} Beds
										</div>
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={bathtub} width="13" alt=""/></div>{propertyDetail.bathrooms} Bath
										</div>
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={move} width="13" alt=""/></div>{propertyDetail.propert_size}
										</div>
									</div>
								</div>
							</div>
							
							{/* <!-- Details and Feture Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#features" data-bs-target="#clOne" aria-controls="clOne" href="javascript:void(0);" aria-expanded="false"><h4 class="property_block_title">Detail & Features</h4></a>
								</div>
								<div id="clOne" class="panel-collapse collapse show" aria-labelledby="clOne">
									<div class="block-body">
										<ul class="deatil_features">
											<li><strong>Bedrooms:</strong>{propertyDetail.beds} Beds</li>
											<li><strong>Bathrooms:</strong>{propertyDetail.bathrooms} Bath</li>
											<li><strong>Areas:</strong>{propertyDetail.propert_size}</li>
											{/* <li><strong>Garage</strong>1</li> */}
											<li><strong>Property Type:</strong>{propertyDetail.property_type}</li>
											{/* <li><strong>Year:</strong>Built1982</li> */}
											<li><strong>Status:</strong>Active</li>
											{/* <li><strong>Cooling:</strong>Central A/C</li> */}
											{/* <li><strong>Heating Type:</strong>Forced Air</li> */}
											{/* <li><strong>Kitchen Features:</strong>Kitchen Facilities</li> */}
											{/* <li><strong>Exterior:</strong>FinishBrick</li> */}
											{/* <li><strong>Swimming Pool:</strong>Yes</li> */}
											{/* <li><strong>Elevetor:</strong>Yes</li> */}
											{/* <li><strong>Fireplace:</strong>Yes</li> */}
											{/* <li><strong>Free WiFi:</strong>No</li> */}
											
										</ul>
									</div>
								</div>
								
							</div>

							{/* <!-- Description Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#dsrp" data-bs-target="#clTwo" aria-controls="clTwo" href="javascript:void(0);" aria-expanded="true"><h4 class="property_block_title">Description</h4></a>
								</div>
								<div id="clTwo" class="panel-collapse collapse show">
									<div class="block-body">
										<p>{propertyDetail?.description}</p>
										{/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> */}
									</div>
								</div>
							</div>
							
							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#amen"  data-bs-target="#clThree" aria-controls="clThree" href="javascript:void(0);" aria-expanded="true"><h4 class="property_block_title">Ameneties</h4></a>
								</div>
								
								<div id="clThree" class="panel-collapse collapse show">
									<div class="block-body">
										<ul class="avl-features third color">
											{propertyDetail?.amenitie_record?.map((i) => (
												<li>{i.name}</li>
											))}
											{/* <li>Air Conditioning</li>
											<li>Swimming Pool</li>
											<li>Central Heating</li>
											<li>Laundry Room</li>
											<li>Gym</li>
											<li>Alarm</li>
											<li>Window Covering</li>
											<li>Internet</li>
											<li>Pets Allow</li>
											<li>Free WiFi</li>
											<li>Car Parking</li>
											<li>Spa & Massage</li> */}
										</ul>
									</div>
								</div>
							</div>
							
							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
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
											{/* <div class="thumb">
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
											</div> */}
										</div>
									</div>
								</div>
								
							</div>
							
							{/* <!-- Single Block Wrap --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#floor"  data-bs-target="#clFive" aria-controls="clFive" href="javascript:void(0);" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Floor Plan</h4></a>
								</div>
								
								<div id="clFive" class="panel-collapse collapse">
									<div class="block-body">
										<div class="accordion" id="floor-option">
											<div class="card">
												<div class="card-header" id="firstFloor">
													<h2 class="mb-0">
														<button type="button" class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#firstfloor" aria-controls="firstfloor">First Floor<span>740 sq ft</span></button>									
													</h2>
												</div>
												<div id="firstfloor" class="collapse" aria-labelledby="firstFloor" data-parent="#floor-option">
													<div class="card-body">
														<img src="assets/img/floor.jpg" class="img-fluid" alt="" />
													</div>
												</div>
											</div>
											<div class="card">
												<div class="card-header" id="seconfFloor">
													<h2 class="mb-0">
														<button type="button" class="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#secondfloor" aria-controls="secondfloor">Second Floor<span>710 sq ft</span></button>
													</h2>
												</div>
												<div id="secondfloor" class="collapse" aria-labelledby="seconfFloor" data-parent="#floor-option">
													<div class="card-body">
														<img src="assets/img/floor.jpg" class="img-fluid" alt="" />
													</div>
												</div>
											</div>
											<div class="card">
												<div class="card-header" id="third-garage">
													<h2 class="mb-0">
														<button type="button" class="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#garages" aria-controls="garages">Garage<span>520 sq ft</span></button>                     
													</h2>
												</div>
												<div id="garages" class="collapse" aria-labelledby="third-garage" data-parent="#floor-option">
													<div class="card-body">
														<img src="assets/img/floor.jpg" class="img-fluid" alt="" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
							</div> */}
							
                            

							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#loca"  data-bs-target="#clSix" aria-controls="clSix" href="javascript:void(0);" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Location</h4></a>
								</div>
								
								<div id="clSix" class="panel-collapse collapse">
									<div class="block-body">
										<div class="map-container">
											{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.3838103135677!2d80.87929001488125!3d26.827742183164247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfe8bc34b51bb%3A0xa3ca86eec63f6f8!2sINFOSYS%20DIGITAL%20COMPUTER%20(Prabhat%20Computer%20Classes)!5e0!3m2!1sen!2sin!4v1680238790732!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
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
								
							</div>
							
							{/* <!-- Single Block Wrap --> */}
							<div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#clSev"  data-bs-target="#clSev" aria-controls="clOne" href="javascript:void(0);" aria-expanded="true" class="collapsed"><h4 class="property_block_title">Gallery</h4></a>
								</div>
								
								<div id="clSev" class="panel-collapse collapse">
									<div class="block-body">
										<ul class="list-gallery-inline">
											{propertyDetail?.propertie_image?.map((i) => (
												<li>
													<a href="assets/img/p-1.jpg" class="mfp-gallery"><img src={i.gallery_image} class="img-fluid mx-auto" alt="" /></a>
												</li>
											))}
											{/* <li>
												<a href="assets/img/p-1.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li>
											<li>
												<a href="assets/img/p-2.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li>
											<li>
												<a href="assets/img/p-3.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li>
											<li>
												<a href="assets/img/p-4.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li>
											<li>
												<a href="assets/img/p-5.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li>
											<li>
												<a href="assets/img/p-6.jpg" class="mfp-gallery"><img src={C1} class="img-fluid mx-auto" alt="" /></a>
											</li> */}
										</ul>
									</div>
								</div>
								
							</div>
							
							{/* <!-- All over Review --> */}
							{/* <div class="rating-overview">
								<div class="rating-overview-box">
									<span class="rating-overview-box-total">4.2</span>
									<span class="rating-overview-box-percent">out of 5.0</span>
									<div class="star-rating" data-rating="5">
										<i class="fas fa-star fs-xs mx-1"></i><i class="fas fa-star fs-xs mx-1"></i><i class="fas fa-star fs-xs mx-1"></i><i class="fas fa-star fs-xs mx-1"></i><i class="fas fa-star fs-xs mx-1"></i>
									</div>
								</div>

								<div class="rating-bars">
										<div class="rating-bars-item">
											<span class="rating-bars-name">Service</span>
											<span class="rating-bars-inner">
												<span class="rating-bars-rating high" data-rating="4.7">
													<span class="rating-bars-rating-inner" style={{width:'80%'}} ></span>
												</span>
												<strong>4.7</strong>
											</span>
										</div>
										<div class="rating-bars-item">
											<span class="rating-bars-name">Value for Money</span>
											<span class="rating-bars-inner">
												<span class="rating-bars-rating good" data-rating="3.9">
													<span class="rating-bars-rating-inner" style={{width:'75%'}}></span>
												</span>
												<strong>3.9</strong>
											</span>
										</div>
										<div class="rating-bars-item">
											<span class="rating-bars-name">Location</span>
											<span class="rating-bars-inner">
												<span class="rating-bars-rating mid" data-rating="3.2">
													<span class="rating-bars-rating-inner" style={{width:'52%'}}></span>
												</span>
												<strong>3.2</strong>
											</span>
										</div>
										<div class="rating-bars-item">
											<span class="rating-bars-name">Cleanliness</span>
											<span class="rating-bars-inner">
												<span class="rating-bars-rating poor" data-rating="2.0">
													<span class="rating-bars-rating-inner" style={{width:'20%'}}></span>
												</span>
												<strong>2.0</strong>
											</span>
										</div>
								</div>
							</div> */}
							{/* <!-- All over Review --> */}
							
							{/* <!-- Single Reviews Block --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#rev"  data-bs-target="#clEight" aria-controls="clEight" href="javascript:void(0);" aria-expanded="true"><h4 class="property_block_title">102 Reviews</h4></a>
								</div>
								
								<div id="clEight" class="panel-collapse collapse show">
									<div class="block-body">
										<div class="author-review">
											<div class="comment-list">
												<ul>
													<li class="article_comments_wrap">
														<article>
															<div class="article_comments_thumb">
																<img src="assets/img/user-1.png" alt=""/>
															</div>
															<div class="comment-details">
																<div class="comment-meta">
																	<div class="comment-left-meta">
																		<h4 class="author-name">Rosalina Kelian</h4>
																		<div class="comment-date">19th May 2018</div>
																	</div>
																</div>
																<div class="comment-text">
																	<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
																		perspiciatis unde omnis iste natus error.</p>
																</div>
															</div>
														</article>
													</li>
													<li class="article_comments_wrap">
														<article>
															<div class="article_comments_thumb">
																<img src="assets/img/user-5.png" alt=""/>
															</div>
															<div class="comment-details">
																<div class="comment-meta">
																	<div class="comment-left-meta">
																		<h4 class="author-name">Rosalina Kelian</h4>
																		<div class="comment-date">19th May 2018</div>
																	</div>
																</div>
																<div class="comment-text">
																	<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
																		perspiciatis unde omnis iste natus error.</p>
																</div>
															</div>
														</article>
													</li>
												</ul>
											</div>
										</div>
										<a href="#" class="reviews-checked text-primary"><i class="fas fa-arrow-alt-circle-down mr-2"></i>See More Reviews</a>
									</div>
								</div>
								
							</div> */}
							
							{/* <!-- Single Block Wrap --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#nearby" data-bs-target="#clNine" aria-controls="clNine" href="javascript:void(0);" aria-expanded="true"><h4 class="property_block_title">Nearby</h4></a>
								</div>
								
								<div id="clNine" class="panel-collapse collapse show">
									<div class="block-body">
										
										<div class="nearby-wrap">
											<div class="nearby_header">
												<div class="nearby_header_first">
													<h5>Schools Around</h5>
												</div>
												<div class="nearby_header_last">
													<div class="nearby_powerd">
														Powerd by <img src="assets/img/edu.png" class="img-fluid" alt="" />
													</div>
												</div>
											</div>
											<div class="neary_section_list">
											
												<div class="neary_section">
													<div class="neary_section_first">
														<h4 class="nearby_place_title">Green Iseland School<small>(3.52 mi)</small></h4>
													</div>
													<div class="neary_section_last">
														<div class="nearby_place_rate">
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star"></i>														
														</div>
														<small class="reviews-count">(421 Reviews)</small>
													</div>
												</div>
												
												<div class="neary_section">
													<div class="neary_section_first">
														<h4 class="nearby_place_title">Ragni Intermediate College<small>(0.52 mi)</small></h4>
													</div>
													<div class="neary_section_last">
														<div class="nearby_place_rate">
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star-half filled"></i>														
														</div>
														<small class="reviews-count">(470 Reviews)</small>
													</div>
												</div>
												
												<div class="neary_section">
													<div class="neary_section_first">
														<h4 class="nearby_place_title">Rose Wood Primary Scool<small>(0.47 mi)</small></h4>
													</div>
													<div class="neary_section_last">
														<div class="nearby_place_rate">
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star"></i>														
														</div>
														<small class="reviews-count">(204 Reviews)</small>
													</div>
												</div>
												
											</div>
										</div>
										
										<div class="nearby-wrap">
											<div class="nearby_header">
												<div class="nearby_header_first">
													<h5>Food Around</h5>
												</div>
												<div class="nearby_header_last">
													<div class="nearby_powerd">
														Powerd by <img src="assets/img/food.png" class="img-fluid" alt="" />
													</div>
												</div>
											</div>
											<div class="neary_section_list">
											
												<div class="neary_section">
													<div class="neary_section_first">
														<h4 class="nearby_place_title">The Rise hotel<small>(2.42 mi)</small></h4>
													</div>
													<div class="neary_section_last">
														<div class="nearby_place_rate">
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>														
														</div>
														<small class="reviews-count">(105 Reviews)</small>
													</div>
												</div>
												
												<div class="neary_section">
													<div class="neary_section_first">
														<h4 class="nearby_place_title">Blue Ocean Bar & Restaurant<small>(1.52 mi)</small></h4>
													</div>
													<div class="neary_section_last">
														<div class="nearby_place_rate">
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star filled"></i>
															<i class="fa fa-star"></i>														
														</div>
														<small class="reviews-count">(40 Reviews)</small>
													</div>
												</div>
												
											</div>
										</div>
										
									</div>
								</div>
								
							</div> */}
							
							{/* <!-- Single Write a Review --> */}
							{/* <div class="property_block_wrap style-2">
								
								<div class="property_block_wrap_header">
									<a data-bs-toggle="collapse" data-parent="#comment" data-bs-target="#clTen" aria-controls="clTen" href="javascript:void(0);" aria-expanded="true"><h4 class="property_block_title">Write a Review</h4></a>
								</div>
								
								<div id="clTen" class="panel-collapse collapse show">
									<div class="block-body">
										<form class="form-submit">
											<div class="row">
												
												<div class="col-lg-12 col-md-12 col-sm-12">
													<div class="form-group">
														<textarea class="form-control ht-80" placeholder="Messages"></textarea>
													</div>
												</div>
												
												<div class="col-lg-12 col-md-12 col-sm-12">
													<div class="form-group">
														<select id="ratting" class="form-control border">
															<option value="">&nbsp;</option>
															<option value="1">01 Star</option>
															<option value="2">02 Star</option>
															<option value="3">03 Star</option>
															<option value="4">04 Star</option>
															<option value="5">05 Star</option>
														</select>
													</div>
												</div>
												
												<div class="col-lg-6 col-md-6 col-sm-12">
													<div class="form-group">
														<input type="text" class="form-control" placeholder="Your Name"/>
													</div>
												</div>
												
												<div class="col-lg-6 col-md-6 col-sm-12">
													<div class="form-group">
														<input type="email" class="form-control" placeholder="Your Email"/>
													</div>
												</div>
												
												<div class="col-lg-12 col-md-12 col-sm-12">
													<div class="form-group">
														<button class="btn btn-primary fw-medium px-lg-5 rounded" type="submit">Submit Review</button>
													</div>
												</div>
												
											</div>
										</form>
									</div>
								</div>
								
							</div> */}
							
						</div>
						
						{/* <!-- property Sidebar --> */}
						<div class="col-lg-4 col-md-12 col-sm-12">
							
							{/* <!-- Like And Share --> */}
							<div class="like_share_wrap b-0">
								<ul class="like_share_list">
									<li><a href="JavaScript:Void(0);" class="btn btn-likes" data-toggle="tooltip" data-original-title="Share"><i class="fas fa-share"></i>Share</a></li>
									<li><a href="JavaScript:Void(0);" class="btn btn-likes" data-toggle="tooltip" data-original-title="Save"><i class="fas fa-heart"></i>Save</a></li>
								</ul>
							</div>
							
							<div class="details-sidebar">
							
								{/* <!-- Agent Detail --> */}
								<div class="sides-widget">
									<div class="sides-widget-header bg-primary">
										<div class="agent-photo"><img src="assets/img/user-6.png" alt=""/></div>
										<div class="sides-widget-details">
											<h4><a href="#">{propertyDetail?.user_name}</a></h4>
											<span><i class="lni-phone-handset"></i>{propertyDetail?.user_mobile}</span>
										</div>
										<div class="clearfix"></div>
									</div>
									
									<div class="sides-widget-body simple-form">
										<div class="form-group">
											<label>Email</label>
											<input type="text" class="form-control" placeholder="Your Email"/>
										</div>
										<div class="form-group">
											<label>Phone No.</label>
											<input type="text" class="form-control" placeholder="Your Phone"/>
										</div>
										<div class="form-group">
											<label>Description</label>
											<textarea class="form-control">I'm interested in this property.</textarea>
										</div>
										<button class="btn btn-light-primary fw-medium rounded full-width">Send Message</button>
									</div>
								</div>
								
								{/* <!-- Mortgage Calculator --> */}
								{/* <div class="sides-widget">

									<div class="sides-widget-header bg-primary">
										<div class="sides-widget-details">
											<h4>Mortgage Calculator</h4>
											<span>View your Interest Rate</span>
										</div>
										<div class="clearfix"></div>
									</div>
									
									<div class="sides-widget-body simple-form">
										<div class="form-group">
											<div class="input-with-icon">
												<input type="text" class="form-control" placeholder="Sale Price"/>
												<i class="fa-solid fa-sack-dollar"></i>
											</div>
										</div>
										
										<div class="form-group">
											<div class="input-with-icon">
												<input type="text" class="form-control" placeholder="Down Payment"/>
												<i class="fa-solid fa-piggy-bank"></i>
											</div>
										</div>
										
										<div class="form-group">
											<div class="input-with-icon">
												<input type="text" class="form-control" placeholder="Loan Term (Years)"/>
												<i class="fa-regular fa-calendar-days"></i>
											</div>
										</div>
										
										<div class="form-group">
											<div class="input-with-icon">
												<input type="text" class="form-control" placeholder="Interest Rate"/>
												<i class="fa fa-percent"></i>
											</div>
										</div>
										
										<button class="btn btn-light-primary fw-medium rounded full-width">Calculate</button>
									
									</div>
								</div> */}
								
								
							
							</div>
						</div>
						
					</div>
				</div>
			</section>
			{/* <!-- ============================ Property Detail End ================================== --> */}
				</>
			}
	<Footer/>
    </>
  )
}

export default PropertyDetails