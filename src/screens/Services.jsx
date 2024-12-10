import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { customer_reviews, services } from '../api/auth'


function Services() {
    const [serviceList, setServiceList] = useState([])
	const [service, setSubService] = useState([]);
    const [searchKey, setSearchKey] = useState("")
	const [review, setReview] = useState([]);

    useEffect(() => {
		getServices()
	},[])

	const getServices = async() => {
		const res = await services()
		if(res.status){
            console.log(res)
            setServiceList(res.data)
			setSubService(res.subServices);
		}
	}

    useEffect(() => {
		getServices1()
	},[])

	const getServices1 = async() => {
		const res = await customer_reviews()
		if(res.status){
            console.log(res)
			setReview(res.data);
		}
	}

  return (
    <div>
        <Header/>
        <section>
				<div style={{marginTop:"50px"}} class="container">
					
                <div class="full-search-2 eclip-search italian-search hero-search-radius mt-5">
								<div class="hero-search-content">
									<div class="row">
									
										{/* <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 b-r">
											<div class="form-group">
												<div class="choose-propert-type">
													<ul>
														<li>
															<div class="form-check">
																<input class="form-check-input" type="radio" id="typbuy" name="typeprt"/>
																<label class="form-check-label" for="typbuy">
																	Buy
																</label>
															</div>
														</li>
														<li>
															<div class="form-check">
																<input class="form-check-input" type="radio" id="typrent" name="typeprt" checked/>
																<label class="form-check-label" for="typrent">
																	Rent
																</label>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div> */}
										
										<div class="col-xl-10 col-lg-6 col-md-5 col-sm-12">
											<div class="form-group">
												<div class="position-relative">
													<input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} class="form-control border-0 ps-5" placeholder="Search Services"/>
													<div class="position-absolute top-50 start-0 translate-middle-y ms-2">
														<span class="svg-icon text-primary svg-icon-2hx">
															<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
																<path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
															</svg>
														</span>
													</div>
												</div>
											</div>
										</div>
										
										<div class="col-xl-2 col-lg-3 col-md-3 col-sm-12">
											<div class="form-group">
												<button type="button" onClick={() => navigate(`/all_properties/search?q=${encodeURIComponent(searchKey)}`, {search_key:searchKey})}   class="btn btn-dark full-width">Search</button>
											</div>
										</div>
												
									</div>
								</div>
							</div>

					<div style={{marginTop:"40px"}} class="row justify-content-center">
						<div class="col-lg-7 col-md-10 text-center">
							<div  class="sec-heading center mb-4">
								<h2>Explore Services</h2>
								{/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p> */}
							</div>
						</div>
					</div>
					
					<div class="row justify-content-center gx-3 gy-3">
                        {serviceList?.map((i) => (
                            <div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-white text-success fs-2">
										{/* <i class="fa-solid fa-house"></i> */}
                                        <img src={i?.image} style={{height:"60px", width:"60px", }} alt=""/>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>{i?.service_name}</h4>
										{/* <p>12 Properties</p> */}
									</div>
								</a>
							</div>
						</div>
                        ))}
						{/* <div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-success text-success fs-2">
										<i class="fa-solid fa-house"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Cleaning</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-warning text-warning fs-2">
										<i class="fa-solid fa-building"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Handyman</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-danger text-danger fs-2">
										<i class="fa-solid fa-building-shield"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Cook</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-info text-primary fs-2">
										<i class="fa-solid fa-synagogue"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Pluming</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-success text-success fs-2">
										<i class="fa-solid fa-mosque"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Electricion</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-danger text-danger fs-2">
										<i class="fa-solid fa-tree-city"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Carpentry</h4>
									</div>
								</a>
							</div>
						</div> */}
						
					</div>

					<div style={{marginTop:"40px"}} class="row justify-content-center">
						<div class="col-lg-7 col-md-10 text-center">
							<div  class="sec-heading center mb-4">
								<h2>Home Cleaning Services</h2>
								{/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p> */}
							</div>
						</div>
					</div>
					
					<div class="row justify-content-center gx-3 gy-3">
                        {service?.map((i) => (
                            <div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-white text-success fs-2">
										{/* <i class="fa-solid fa-house"></i> */}
                                        <img src={i?.image} style={{height:"60px", width:"60px", }} alt=""/>
									</div>
									<div class="classical-cats-wrap-content">
										<p>{i?.name}</p>
										{/* <p>12 Properties</p> */}
									</div>
								</a>
							</div>
						</div>
                        ))}
						{/* <div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-success text-success fs-2">
										<i class="fa-solid fa-house"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Cleaning</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-warning text-warning fs-2">
										<i class="fa-solid fa-building"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Handyman</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-danger text-danger fs-2">
										<i class="fa-solid fa-building-shield"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Cook</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-info text-primary fs-2">
										<i class="fa-solid fa-synagogue"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Pluming</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-success text-success fs-2">
										<i class="fa-solid fa-mosque"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Electricion</h4>
									</div>
								</a>
							</div>
						</div>
						
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-danger text-danger fs-2">
										<i class="fa-solid fa-tree-city"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Carpentry</h4>
									</div>
								</a>
							</div>
						</div> */}
						
					</div>
					
				</div>

				<div style={{marginTop:"40px"}} class="row justify-content-center">
						<div class="col-lg-7 col-md-10 text-center">
							<div  class="sec-heading center mb-4">
								<h2>Customer Reviews</h2>
								{/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p> */}
							</div>
						</div>
					</div>

				<div id="carouselMultiItemExample" data-mdb-carousel-init class="carousel slide carousel-dark text-center" data-mdb-ride="carousel">
				<div class="carousel-inner py-4">
					
					{/* {review?.map((item) => (
						<div class="carousel-item">
						<div class="container">
							<div class="row">
							<div class="col-lg-4">
								<img class="rounded-circle shadow-1-strong mb-4"
								src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp" alt="avatar"
								style={{width: "150px"}} />
								<h5 class="mb-3">{item.name}</h5>
								<p>UX Designer</p>
								<p class="text-muted">
								<i class="fas fa-quote-left pe-2"></i>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id
								officiis hic tenetur quae quaerat ad velit ab hic tenetur.
								</p>
								<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								</ul>
							</div>
	
							<div class="col-lg-4 d-none d-lg-block">
								<img class="rounded-circle shadow-1-strong mb-4"
								src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar"
								style={{width: "150px"}} />
								<h5 class="mb-3">Alex Rey</h5>
								<p>Web Developer</p>
								<p class="text-muted">
								<i class="fas fa-quote-left pe-2"></i>
								Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
								suscipit laboriosam, nisi ut aliquid commodi.
								</p>
								<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li>
									<i class="fas fa-star-half-alt fa-sm"></i>
								</li>
								</ul>
							</div>
	
							<div class="col-lg-4 d-none d-lg-block">
								<img class="rounded-circle shadow-1-strong mb-4"
								src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(5).webp" alt="avatar"
								style={{width: "150px"}}/>
								<h5 class="mb-3">Maria Kate</h5>
								<p>Photographer</p>
								<p class="text-muted">
								<i class="fas fa-quote-left pe-2"></i>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
								praesentium voluptatum deleniti atque corrupti.
								</p>
								<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="fas fa-star fa-sm"></i></li>
								<li><i class="far fa-star fa-sm"></i></li>
								</ul>
							</div>
							</div>
						</div>
						</div>
					))} */}
					<div class="carousel-item active">
					<div class="container">
						<div class="row">
						<div class="col-lg-4">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">Anna Deynah</h5>
							<p>UX Designer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id
							officiis hic tenetur quae quaerat ad velit ab hic tenetur.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">John Doe</h5>
							<p>Web Developer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
							suscipit laboriosam, nisi ut aliquid commodi.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li>
								<i class="fas fa-star-half-alt fa-sm"></i>
							</li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">Maria Kate</h5>
							<p>Photographer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
							praesentium voluptatum deleniti atque corrupti.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="far fa-star fa-sm"></i></li>
							</ul>
						</div>
						</div>
					</div>
					</div>

					
					<div class="carousel-item">
					<div class="container">
						<div class="row">
						<div class="col-lg-4">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">John Doe</h5>
							<p>UX Designer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id
							officiis hic tenetur quae quaerat ad velit ab hic tenetur.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">Alex Rey</h5>
							<p>Web Developer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
							suscipit laboriosam, nisi ut aliquid commodi.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li>
								<i class="fas fa-star-half-alt fa-sm"></i>
							</li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(5).webp" alt="avatar"
							style={{width: "150px"}}/>
							<h5 class="mb-3">Maria Kate</h5>
							<p>Photographer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
							praesentium voluptatum deleniti atque corrupti.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="far fa-star fa-sm"></i></li>
							</ul>
						</div>
						</div>
					</div>
					</div>

					
					<div class="carousel-item">
					<div class="container">
						<div class="row">
						<div class="col-lg-4">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(6).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">Anna Deynah</h5>
							<p>UX Designer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id
							officiis hic tenetur quae quaerat ad velit ab hic tenetur.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(8).webp" alt="avatar"
							style={{width: "150px"}} />
							<h5 class="mb-3">John Doe</h5>
							<p>Web Developer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
							suscipit laboriosam, nisi ut aliquid commodi.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li>
								<i class="fas fa-star-half-alt fa-sm"></i>
							</li>
							</ul>
						</div>

						<div class="col-lg-4 d-none d-lg-block">
							<img class="rounded-circle shadow-1-strong mb-4"
							src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(7).webp" alt="avatar"
							style={{width: "150px"}}/>
							<h5 class="mb-3">Maria Kate</h5>
							<p>Photographer</p>
							<p class="text-muted">
							<i class="fas fa-quote-left pe-2"></i>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
							praesentium voluptatum deleniti atque corrupti.
							</p>
							<ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="fas fa-star fa-sm"></i></li>
							<li><i class="far fa-star fa-sm"></i></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>


				<div style={{marginTop:"40px"}} class="row justify-content-center">
						<div class="col-lg-7 col-md-10 text-center">
							<div  class="sec-heading center mb-4">
								<h2>FAQ's</h2>
								{/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p> */}
							</div>
						</div>
					</div>

					<div class="tab-content" id="pills-tabContent">
								
								{/* <!-- general Query --> */}
								<div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
									
									<div class="accordion border-0" id="generalac">
										<div class="card mb-2">
											<div class="card-header" id="headingOne">
											  <h2 class="mb-0">
												<button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
												  How To Install Rikada Theme?
												</button>
											  </h2>
											</div>

											<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#generalac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingTwo">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
												  What is main Requirements For Rikada?
												</button>
											  </h2>
											</div>
											<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#generalac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingThree">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
												  Why Choose Rikada Theme?
												</button>
											  </h2>
											</div>
											<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-bs-parent="#generalac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
									</div>
									
								</div>
								
								{/* <!-- general Query --> */}
								<div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">
									
									<div class="accordion border-0" id="paymentac">
										<div class="card mb-2">
											<div class="card-header" id="headingOne1">
											  <h2 class="mb-0">
												<button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#paymentcollapse" aria-expanded="true" aria-controls="paymentcollapse">
												  May I Request For Refund?
												</button>
											  </h2>
											</div>

											<div id="paymentcollapse" class="collapse show" aria-labelledby="headingOne1" data-bs-parent="#paymentac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingTwo1">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentcollapseTwo" aria-expanded="false" aria-controls="paymentcollapseTwo">
												  May I Get Any Offer in Future?
												</button>
											  </h2>
											</div>
											<div id="paymentcollapseTwo" class="collapse" aria-labelledby="headingTwo1" data-bs-parent="#paymentac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingThree1">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentcollapseThree" aria-expanded="false" aria-controls="paymentcollapseThree">
												  How Much Time It will Take For refund?
												</button>
											  </h2>
											</div>
											<div id="paymentcollapseThree" class="collapse" aria-labelledby="headingThree1" data-bs-parent="#paymentac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
									</div>
									
								</div>
								
								{/* <!-- general Query --> */}
								<div class="tab-pane fade" id="upgrade" role="tabpanel" aria-labelledby="upgrade-tab">
									
									<div class="accordion border-0" id="upgradeac">
										<div class="card mb-2">
											<div class="card-header" id="headingOne2">
											  <h2 class="mb-0">
												<button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#upgradecollapseOne" aria-expanded="true" aria-controls="upgradecollapseOne">
												  How To Upgrade Rikada Theme?
												</button>
											  </h2>
											</div>

											<div id="upgradecollapseOne" class="collapse show" aria-labelledby="headingOne2" data-bs-parent="#upgradeac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingTwo2">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#upgradecollapseTwo" aria-expanded="false" aria-controls="upgradecollapseTwo">
												  Rikada available for WordPress Version?
												</button>
											  </h2>
											</div>
											<div id="upgradecollapseTwo" class="collapse" aria-labelledby="headingTwo2" data-bs-parent="#upgradeac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
										<div class="card mb-2">
											<div class="card-header" id="headingThree2">
											  <h2 class="mb-0">
												<button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#upgradecollapseThree" aria-expanded="false" aria-controls="upgradecollapseThree">
												  Why We need to upgrade Rikada?
												</button>
											  </h2>
											</div>
											<div id="upgradecollapseThree" class="collapse" aria-labelledby="headingThree2" data-bs-parent="#upgradeac">
											  <div class="card-body">
												<p class="ac-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
											  </div>
											</div>
										</div>
									</div>
									
								</div>
							
							</div>

			</section>



			<div class="clearfix"></div>
        <Footer/>
    </div>
  )
}

export default Services