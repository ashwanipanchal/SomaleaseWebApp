import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { customer_reviews, faqs, services } from '../api/auth'
import moment from 'moment'
import Faq from 'react-faq-component';

function Services() {
    const [serviceList, setServiceList] = useState([])
	const [service, setSubService] = useState([]);
    const [searchKey, setSearchKey] = useState("")
	const [review, setReview] = useState([]);
	const [faqList, setFaqList] = useState([]);
	const [faqListData, setFaqListData] = useState({});

	const data = {
		title: "FAQ (How it works)",
		rows: [
		  {
			title: "Lorem ipsum dolor sit amet,",
			content: "Lorem ipsum dolor sit amet, consectetur "
		  },
		  {
			title: "Nunc maximus, magna at ultricies elementum",
			content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam."
		  },
		  {
			title: "Curabitur laoreet, mauris vel blandit fringilla",
			content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc"
		  },
		  {
			title: "What is the package version",
			content: "v1.0.5"
		  }]
	  }
	  
    useEffect(() => {
		getServices()
	},[])

	const getServices = async() => {
		const res = await services()
		if(res.status){
            // console.log(res)
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
            // console.log(res)
			setReview(res.data);
		}
	}
    useEffect(() => {
		faq()
	},[])

	const faq = async() => {
		const res = await faqs()
		if(res.status){
            // console.log(res)
			let temp = []
			res.data?.map((i) => {
				temp.push({
					title:i.question,
					content: i.answer
				  })
			})
			setFaqListData({
				title: "FAQ (How it works)",
				rows: temp
			})
			console.log(temp)
			setFaqList(temp);
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
					
						<div class="carousel-item active">
						<div class="container">
							<div class="row">
					{review?.map((item,index) => (
						<>
							<div class="col-lg-4">
								{/* <img class="rounded-circle shadow-1-strong mb-4"
								src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp" alt="avatar"
								style={{width: "150px"}} /> */}
								<div
								className='shadow-1-strong mb-4'
									style={{
										backgroundColor: index == 0 ? 'orange': "pink",
										width: "150px",
										height: "150px",
										borderRadius: "75px",
										alignSelf:"center",
										display:"flex",
										alignItems:"center",
										justifyContent:"center"
									}}>
									<p
										style={{
										// fontFamily: 'Montserrat-SemiBold',
										fontSize: "24px",
										color: 'white',
										// alignSelf: 'center',
										// alignSelf:"center"
										}}>
										{item.name.substring(0, 1)}
									</p>
									</div>
								<h5 class="mb-3">{item.name}</h5>
								{/* <p>UX Designer</p> */}
								<p class="text-muted">
								<i class="fas fa-quote-left pe-2"></i>
								{item.description}
								</p>
								<p class="text-muted">
								{moment(item.created_at).format('DD/MM/YYYY')}
								</p>
							</div>
	
							{/* <div class="col-lg-4 d-none d-lg-block">
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
							</div> */}
						</>
					))}
					</div>
				</div>
				</div>
					{/* <div class="carousel-item active">
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
					</div> */}

					
					{/* <div class="carousel-item">
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
					</div> */}
				</div>
				</div>


				<div style={{marginTop:"40px"}} class="row justify-content-center">
						<div class="col-lg-7 col-md-10">
							<div  class="sec-heading mb-4">
							<Faq data={faqListData}/>
								{/* <h2>FAQ's</h2> */}
								{/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p> */}
							</div>
						</div>
					</div>

					{/* <div style={{margin:"20px"}} class="tab-content" id="pills-tabContent">
								
								<div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
									
									<div class="accordion border-0" id="generalac">
								{faqList.map((item) => (
									<div class="card mb-2">
									<div class="card-header" id="headingOne">
									  <h2 class="mb-0">
										<button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										{item.question}
										</button>
									  </h2>
									</div>

									<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#generalac">
									  <div class="card-body">
										<p class="ac-para">{item.answer}</p>
									  </div>
									</div>
								</div>
								))}
									</div>
									
								</div>

							
							</div> */}
							 

			</section>



			<div class="clearfix"></div>
        <Footer/>
    </div>
  )
}

export default Services