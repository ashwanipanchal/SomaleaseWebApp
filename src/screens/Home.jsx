import React, { useEffect, useState } from 'react'
import ff from "../assets/img/side-city-1.png";
import dummy from "../assets/img/1.webp";
import SalePropertyHome from '../components/SalePropertyHome';
import RentPropertyHome from '../components/RentPropertyHome';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { join_service_provider } from '../api/auth';

function Home() {
	const [name, setName] = useState('')
	const [mobile, setMobile] = useState('')
	const [email, setEmail] = useState('')
	const [providerName, setProviderName] = useState('')
	const [exp, setExp] = useState('')
	const MySwal = withReactContent(Swal);
	const navigate = useNavigate()
	const [searchKey, setSearchKey] = useState("")

	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);
	
	const showAlert = async(res) => {
		MySwal.fire({
			title: "Request sent successfully",
			icon: "success",
			cancelButtonColor: "#d33",
			confirmButtonText: "OK",

		  }).then((result) => {
			if (result.isConfirmed) {
				// handleClose()
			  } 
		  });
	}

	const submitJoiningForm = async() => {
		if (name == '') {
			toast.error('Please enter your name');
			return;
		  }
		  if (mobile == '') {
			toast.error('Please enter your mobile no.');
			return;
		  }
		  if (email == "") {
			toast.error('Please enter your valid email address');
			return;
		  }
		  if (providerName == '') {
			toast.error('Please enter your service');
			return;
		  }
		  if (exp == '') {
			toast.error('Please enter your experience');
			return;
		  }

		  const id = await localStorage.getItem("user_id")
		  let formdata = new FormData();
		  formdata.append('user_id', id);
		  formdata.append('name', name);
		  formdata.append('phone', mobile);
		  formdata.append('email', email);
		  formdata.append('service_provide', providerName);
		  formdata.append('experience', exp);

		  const res = await join_service_provider(formdata)
			console.log(res)
			if(res.status){
				setName("")
				setMobile("")
				setEmail("")
				setProviderName("")
				setExp("")
				handleClose()
				showAlert()
			}
	}

  return (
    <>
       <div id="main-wrapper">
			<Header/>


{/* <!-- ============================ Hero Banner  Start================================== --> */}
			<div class="light-bg hero-banner">
				<div class="container">
					<div class="row align-items-center">
						<div class="col-xl-7 col-lg-7 col-md-12 col-sm-12">
							<p class="d-inline-flex sm-small text-light rounded-5 px-2 py-1 bg-dark align-items-center">We just launched our service in New York, United States<span class="sm-small px-2 rounded-5 bg-primary text-light ms-2">New</span></p>
							<h2>Find Your Dream House<br/>In Europe Now.</h2>
							<p class="small">Find homes in 80+ different countries represented byb 700 leading member brokerages.</p>
							<div class="full-search-2 eclip-search italian-search hero-search-radius mt-5">
								<div class="hero-search-content">
									<div class="row">
									
										<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 b-r">
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
										</div>
										
										<div class="col-xl-7 col-lg-6 col-md-5 col-sm-12 px-xl-0 px-lg-0 px-md-0">
											<div class="form-group border-start borders">
												<div class="position-relative">
													<input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} class="form-control border-0 ps-5" placeholder="Search for a property"/>
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
							<div class="searches-lists">
								<ul>

								</ul>
							</div>
							
						</div>
						<div class="col-xl-5 col-lg-5 col-md-12 col-sm-12">
							<div class="">
								<img src={ff} class="img-fluid" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- ============================ Hero Banner End ================================== --> */}

          {/* <!-- ============================ Category Start ================================== --> */}
			<section>
				<div class="container">
					
					<div class="row justify-content-center">
						<div class="col-lg-7 col-md-10 text-center">
							<div class="sec-heading center mb-4">
								<h2>Explore Services</h2>
								<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
							</div>
						</div>
					</div>
					
					<div class="row justify-content-center gx-3 gy-3">
						<div class="col-xl-2 col-lg-3 col-md-3 col-6">
							<div class="classical-cats-wrap">
								<a class="classical-cats-boxs">
									<div class="classical-cats-icon px-4 py-4 rounded bg-light-success text-success fs-2">
										<i class="fa-solid fa-house"></i>
									</div>
									<div class="classical-cats-wrap-content">
										<h4>Cleaning</h4>
										{/* <p>12 Properties</p> */}
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
										{/* <p>16 Properties</p> */}
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
										{/* <p>22 Properties</p> */}
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
										{/* <p>18 Properties</p> */}
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
										{/* <p>42 Properties</p> */}
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
										{/* <p>63 Properties</p> */}
									</div>
								</a>
							</div>
						</div>
						
					</div>
					
				</div>
			</section>
			<div class="clearfix"></div>
			{/* <!-- ============================ Category End ================================== --> */}

      {/* <!-- ============================ Step How To Use Start ================================== --> */}
      <section>
  			<div class="container">

  				<div class="row justify-content-center">
  					<div class="col-xl-6 col-lg-7 col-md-10 text-center">
  						<div class="sec-heading center">
  							<h2>How It Works?</h2>
  							<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
  						</div>
  					</div>
  				</div>

  				<div class="row justify-content-center g-4">
  					<div class="col-lg-4 col-md-4">
  						<div class="middle-icon-features-item">
  							<div class="icon-features-wrap">
  								<div class="middle-icon-large-features-box f-light-success">
  									<span class="svg-icon text-success svg-icon-2hx"><svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  											<path d="M13.0021 10.9128V3.01281C13.0021 2.41281 13.5021 1.91281 14.1021 2.01281C16.1021 2.21281 17.9021 3.11284 19.3021 4.61284C20.7021 6.01284 21.6021 7.91285 21.9021 9.81285C22.0021 10.4129 21.5021 10.9128 20.9021 10.9128H13.0021Z" fill="currentColor"/>
  											<path opacity="0.3" d="M11.0021 13.7128V4.91283C11.0021 4.31283 10.5021 3.81283 9.90208 3.91283C5.40208 4.51283 1.90209 8.41284 2.00209 13.1128C2.10209 18.0128 6.40208 22.0128 11.3021 21.9128C13.1021 21.8128 14.7021 21.3128 16.0021 20.4128C16.5021 20.1128 16.6021 19.3128 16.1021 18.9128L11.0021 13.7128Z" fill="currentColor"/>
  											<path opacity="0.3" d="M21.9021 14.0128C21.7021 15.6128 21.1021 17.1128 20.1021 18.4128C19.7021 18.9128 19.0021 18.9128 18.6021 18.5128L13.0021 12.9128H20.9021C21.5021 12.9128 22.0021 13.4128 21.9021 14.0128Z" fill="currentColor"/>
  										</svg>
  									</span>
  								</div>
  							</div>
  							<div class="middle-icon-features-content">
  								<h4>Evaluate Property</h4>
  								<p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken specimens.</p>
  							</div>
  						</div>
  					</div>

  					<div class="col-lg-4 col-md-4">
  						<div class="middle-icon-features-item">
  							<div class="icon-features-wrap">
  								<div class="middle-icon-large-features-box f-light-warning">
  									<span class="svg-icon text-warning svg-icon-2hx">
  										<svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  											<path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="currentColor"/>
  											<rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="currentColor"/>
  											<path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="currentColor"/>
  											<rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="currentColor"/>
  										</svg>
  									</span>
  								</div>
  							</div>
  							<div class="middle-icon-features-content">
  								<h4>Meet Your Agent</h4>
  								<p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken specimens.</p>
  							</div>
  						</div>
  					</div>

  					<div class="col-lg-4 col-md-4">
  						<div class="middle-icon-features-item remove">
  							<div class="icon-features-wrap">
  								<div class="middle-icon-large-features-box f-light-purple">
  									<span class="svg-icon text-purple svg-icon-2hx">
  										<svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24">
  											<path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor"/>
  											<path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white"/>
  										</svg>
  									</span>
  								</div>
  							</div>
  							<div class="middle-icon-features-content">
  								<h4>Close The Deal</h4>
  								<p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken specimens.</p>
  							</div>
  						</div>
  					</div>
  				</div>

  			</div>
  		</section>

		  <section>
		<div class="footer-area pt-150 pb-150" style={{backgroundImage:`url(${dummy})`, paddingTop:150, paddingBottom:150}}>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="footer-text text-center">
								<h2>Looking for Tenants/Buyers?</h2>
								<p>Faster & Verified Tenants/Buyers</p>
								<p>Pay ZERO brokerage</p>
								<a style={{cursor:"pointer"}} onClick={() => navigate("/post_property")}>Post Property</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<SalePropertyHome/>

		<section>
		<div class="footer-area pt-150 pb-150" style={{backgroundImage:`url(${dummy})`, paddingTop:150, paddingBottom:150}}>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="footer-text text-center">
								<h2>Raad Reeb</h2>
								<p>Let's achieve self-reliance and sustainability together with ease</p>
								{/* <p>Pay ZERO brokerage</p> */}
								<a style={{cursor:"pointer"}} onClick={() => navigate("/donation_list")}>Participate Now</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<RentPropertyHome/>

		<section>
		<div class="footer-area pt-150 pb-150" style={{backgroundImage:`url(${dummy})`, paddingTop:150, paddingBottom:150}}>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="footer-text text-center">
								<h2>Join as Service Provider</h2>
								<p>Let's achieve self-reliance and sustainability together with ease</p>
								{/* <p>Pay ZERO brokerage</p> */}
								<a style={{cursor:"pointer"}} onClick={() => paymentShow()}>Register</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

  		{/* <!-- ============================ Call To Action ================================== --> */}
  		<section class="theme-bg call-to-act-wrap">
  			<div class="container">
  				<div class="row">
  					<div class="col-lg-12">

  						<div class="call-to-act">
  							<div class="call-to-act-head">
  								<h3>Want to Become a Real Estate Agent?</h3>
  								<span>We'll help you to grow your career and growth.</span>
  							</div>
  							<a href="#" class="btn btn-call-to-act">SignUp Today</a>
  						</div>

  					</div>
  				</div>
  			</div>
  		</section>
  		{/* <!-- ============================ Call To Action End ================================== --> */}

		  

			<Footer/>

			<Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Joining Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
						<div class="form-group col-md-12">
								<label>Name</label>
								<input value={name}
									onChange={(e) => setName(e.target.value)} type="text" class="form-control" />
								</div>
						<div class="form-group col-md-12">
								<label>Mobile No.</label>
								<input value={mobile}
									onChange={(e) => setMobile(e.target.value)} type="number" class="form-control" />
								</div>
						<div class="form-group col-md-12">
								<label>Email ID</label>
								<input value={email}
									onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" />
								</div>
						<div class="form-group col-md-12">
								<label>Service you provide</label>
								<input value={providerName}
									onChange={(e) => setProviderName(e.target.value)} type="text" class="form-control" />
								</div>
						<div class="form-group col-md-12">
								<label>Experience (Yrs)</label>
								<input value={exp}
									onChange={(e) => setExp(e.target.value)} type="number" class="form-control" />
								</div>
                            <div className="layout-button mt-15">
                                <div className="col-md-12">
                                    {/* <button type="button" onClick={()=>downloadSample()} className="btn btn-outline-primary btn-squared color-primary">Download Sample File</button> */}
                                    <button type="button" onClick={()=>{submitJoiningForm()}} className="btn btn-primary btn-default btn-squared">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
			<ToastContainer />
        </div>
    </>
  )
}

export default Home