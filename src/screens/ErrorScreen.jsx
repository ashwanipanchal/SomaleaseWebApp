import React from 'react'
import error_image from "../assets/img/404.png"
import { useNavigate } from 'react-router-dom';
function ErrorScreen() {
    const navigate = useNavigate();
  return (
    <>
        			{/* <!-- ============================ User Dashboard ================================== --> */}
			<section class="error-wrap">
				<div class="container">
					<div class="row justify-content-center">
						
						<div class="col-lg-6 col-md-10">
							<div class="text-center">
								
								<img src={error_image} class="img-fluid" alt=""/>
								<h5 style={{margin:40}}>The page you're looking for isn't available</h5>
								<button class="btn btn-primary px-5" onClick={() => navigate("/")}>Back To Home</button>
								
							</div>
						</div>
						
					</div>
				</div>
			</section>
			{/* <!-- ============================ User Dashboard End ================================== --> */}
    </>
  )
}

export default ErrorScreen