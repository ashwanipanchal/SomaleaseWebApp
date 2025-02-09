import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScreenLoader from '../components/LoaderButton/ScreenLoader';
import { about_us } from '../api/auth';

const AboutUs = () => {
    const [loading, setLoading] = useState(false);
	const [data, setData] = useState("")

	useEffect(() =>{
		getData()
	},[])

	const getData = async() => {
		setLoading(true)
		const res = await about_us()
		console.log(res)
		setData(res.about_us)
        setLoading(false);
	}

	if(loading) {

		return <ScreenLoader/>
	}


  return (
    <>
    <Header/>
    <section class="gray-bg">
				<div class="container">
				
					<div class="row">
						<div class="col-lg-12 col-md-12">
							<div style={{marginTop:"50px"}} class="sec-heading">
								<h2>About Us</h2>

								<div
									dangerouslySetInnerHTML={{ __html: data }}
								/>


                {/* <p>              Last Updated: June 6, 2024 Welcome to www.somalease.com and the Somalease mobile applications (collectively, the “Services”). By accessing or using our Services, you agree to be bound by these Terms of Use. Please read them carefully.</p>

   <p> 1.    Acceptance of Terms
By accessing or using our Services, you agree to comply with and be bound by these terms and conditions. If you do not agree, please do not use the Services.</p> */}
    {/* 2.    Changes to Terms  */}
{/* Somalease Ltd. reserves the right to modify these Terms of Use at any time. Any changes will be effective immediately upon posting on our website or mobile applications. Your continued use of the Services after changes are posted constitutes your acceptance of the new terms.
    3.    Use of the Services
You agree to use the Services for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use and enjoyment of the Services.
    4.    Intellectual Property
All content, trademarks, and data on the Services, including but not limited to software, databases, text, graphics, icons, and hyperlinks, are the property of or licensed to Somalease Ltd. and are protected by law. Unauthorized use is prohibited.
    5.    User Content
By posting content on our Services, you grant Somalease Ltd. a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, and display such content on the Services.
    6.    Privacy
Your use of the Services is also subject to our Privacy Policy.
    7.    Disclaimer of Warranties
The Services are provided “as is” without any representations or warranties, express or implied. Somalease Ltd. makes no representations or warranties in relation to the Services or the information and materials provided on the Services.
    8.    Limitation of Liability
Somalease Ltd. will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to, or use of, the Services.
    9.    Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law principles. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Kenya. However, we recognize that the internet and mobile applications are global environments, and you agree to comply with all local laws applicable to your use of the Services.
    10.    Contact Information
For any queries regarding these Terms of Use, please contact us at:
Nairobi Office:
58 Burhan Estate,
Muratina Road, Eastleigh 00610
+254 (0) 703474747
info@somalease.com

© Somalease. All rights reserved */}
                {/* </p> */}
							</div>
						</div>
					</div>
					
					{/* <div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12">
						
							<div class="team-slide item-slide">
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-1.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Shaurya Preet</h4>
											<span>Co-Founder</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-2.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Shivangi Preet</h4>
											<span>Content Writer</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-3.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Yash Preet</h4>
											<span>Content Writer</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-4.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Dhananjay Preet</h4>
											<span>CEO & Manager</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-5.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Rahul Gilkrist</h4>
											<span>App Designer</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
								<div class="single-team">
									<div class="team-grid">
								
										<div class="teamgrid-user">
											<img src="assets/img/team-6.jpg" alt="" class="img-fluid" />
										</div>
										
										<div class="teamgrid-content">
											<h4>Adam Wilcard</h4>
											<span>Web Developer</span>
										</div>
										
										<div class="teamgrid-social">
											<ul>
												<li><a href="#" class="f-cl"><i class="fa-brands fa-facebook"></i></a></li>
												<li><a href="#" class="t-cl"><i class="fa-brands fa-twitter"></i></a></li>
												<li><a href="#" class="i-cl"><i class="fa-brands fa-instagram"></i></a></li>
												<li><a href="#" class="l-cl"><i class="fa-brands fa-linkedin"></i></a></li>
											</ul>
										</div>
							
									</div>
								</div>
								
							</div>
						
						</div>
					</div> */}
				
				</div>
			</section>
    <Footer />
    </>
  )
}

export default AboutUs 