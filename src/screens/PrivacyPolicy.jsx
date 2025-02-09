import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScreenLoader from '../components/LoaderButton/ScreenLoader';
import {  privacy_policy } from '../api/auth';

const PrivacyPolicy = () => {
    const [loading, setLoading] = useState(false);
	const [data, setData] = useState("")

	useEffect(() =>{
		getData()
	},[])

	const getData = async() => {
		setLoading(true)
		const res = await privacy_policy()
		// console.log(res)
		setData(res.privacy_policy)
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
							<div style={{marginTop:"50px"}} class="sec-heading ">
								<h2>Privacy Policy</h2>

								<div
									dangerouslySetInnerHTML={{ __html: data }}
								/>
                </div>
                </div>
                </div>
				</div>
			</section>
    <Footer />
    </>
  )
}

export default PrivacyPolicy 