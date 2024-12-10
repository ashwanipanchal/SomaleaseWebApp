import React, {useState, useEffect} from 'react'
import { my_apartment_for_tenant } from '../../../api/auth';
import moment from 'moment';
import ScreenLoader from '../../LoaderButton/ScreenLoader';
import { useNavigate } from 'react-router-dom';

const MyApartments = () => {
	const navigate = useNavigate()
    const [listOfDonation, setListOfDonation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getApartment();
    }, []);
  
    const getApartment = async () => {
        const user_id = localStorage.getItem("user_id");
        setLoading(true)
      const res = await my_apartment_for_tenant({
        user_id: user_id.toString(),
      });
      setLoading(false)
      if (res.status) {
        setListOfDonation(res.data);
      }
    };

    if(loading){
        return(
            <ScreenLoader/>
        )
    }

  return (
<div class="row justify-content-center">
          {listOfDonation?.map((i) => (
            <div style={{marginBottom:"30px"}} class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
									<div class="property-listing card border-0 rounded-3">
										
										<div class="listing-img-wrapper p-3">
											<div class="list-img-slide position-relative">
												{/* <div class="position-absolute top-0 left-0 ms-3 mt-3 z-1">
													<div class="label bg-success text-light d-inline-flex align-items-center justify-content-center">
														<span class="svg-icon text-light svg-icon-2hx me-1">
															<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"></path>
																<path d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z" fill="currentColor"></path>
															</svg>
														</span>Verified
													</div>
												</div> */}
												<div class="click rounded-3 overflow-hidden mb-0">
													<div><a ><img style={{height:260, width:340}} src={i?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" /></a></div>
												</div>
											</div>
										</div>
										
										<div class="listing-caption-wrapper px-3">
											<div class="listing-detail-wrapper">
												<div class="listing-short-detail-wrap">
													<div class="listing-short-detail">
                                                    <div class="price-features-wrapper">
											</div>
														<h4 class="listing-name fw-semibold fs-5 mb-1">{i.properties.apartment_name}</h4>
														<div class="prt-location text-muted-2">
															{/* <span class="svg-icon svg-icon-2hx">
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
																	<path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
																</svg>
															</span> */}
															{i.properties.locality}
														</div>
													</div>
												</div>
											</div>
											
											
											
											<div class="listing-detail-footer d-flex align-items-center justify-content-between py-4">
												<div class="listing-short-detail-flex">
													<h6 class="listing-card-info-price m-0">{i?.property_available == 1 ? `Rent: ${i.properties.currency}${i.properties.expected_rent}` : `Price: ${i.properties.currency}${i.properties.selling_price}` }
                                                    </h6>
												</div>
												<div class="footer-flex">
                                                <div onClick={() => navigate("apartment_details", {state: i})} class="listing-detail-btn">
                                                    <a class="btn btn-sm px-4 fw-medium btn-primary">View </a>
                                               </div>
												</div>
											</div>
										
										</div>
										
									</div>
								</div>
          ))}
        </div>
  )
}

export default MyApartments