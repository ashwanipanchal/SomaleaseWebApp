import React,{useEffect, useState} from 'react'

import C1 from '../assets/img/p-1.jpg'
import C2 from '../assets/img/p-2.jpg'
import C3 from '../assets/img/p-3.jpg'
import C4 from '../assets/img/p-4.jpg'
import C5 from '../assets/img/p-5.jpg'
import C6 from '../assets/img/p-6.jpg'
import ReactPaginate from 'react-paginate';
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { home_properties, propertie_search } from '../api/auth'
import { MagnifyingGlass } from 'react-loader-spinner'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import Header from '../components/Header'

function AllProperties() {
	const navigate = useNavigate();
		let { type } = useParams();
		console.log(type)
		const location = useLocation();

		// Extract search query from the URL
		


	  // State to track the selected location
	  const [selectedLocation, setSelectedLocation] = useState('Chicago');
	  const [isCollapsed, setIsCollapsed] = useState(true);
	  const [loading, setLoading] = useState(false);
	  const [allProperties, setAllProperties] = useState([]);
	

	  useEffect(() => {
		if(type == "search"){
			const queryParams = new URLSearchParams(location.search);
			const searchQuery = queryParams.get('q');
			searchPropertry(searchQuery)
		}else{
			getProperies()
		}
	},[])

	const getProperies = async() => {
		setLoading(true)
		const res = await home_properties()
		if(res.status){
			console.log(res)
			setLoading(false)
			if(type == "sales"){
				setAllProperties(res.sale_propertie);
			}
			if(type == "rent"){
				setAllProperties(res.rent_propertie);
			}
		}
	}

	const searchPropertry = async(key) => {
		setLoading(true)
		const body = {
			user_id: localStorage.getItem("user_id"),
			bhk_type: '',
			apartment_name: key,
			// bhk_type: "",
			min_price: 0,
			max_price: "",
			// property_available: selected == 0 ? '' : selected == 1 ? '1' : '2',
		  }
		  console.log(body)
		const res = await propertie_search(body)
		if(res.status){
			console.log(res)
			setLoading(false)
			setAllProperties(res.propertie)
		}
	}

	  // List of locations
	  const locations = [
		'Atlanta',
		'Austin',
		'Boston',
		'Chicago',
		'Dallas',
		'Denver',
		'Houston',
		'Jacksonville',
		'Los Angeles',
	  ];

	  // Function to handle location selection
	  const handleSelectLocation = (location) => {
		setSelectedLocation(location);
		setIsCollapsed(true); // Collapse the list after selection
	  };

	  const [itemOffset, setItemOffset] = useState(0);

	  // Simulate fetching items from another resources.
	  // (This could be items from props; or items loaded in a local state
	  // from an API endpoint with useEffect and useState)
	  const [itemsPerPage] = useState(10);
	  const endOffset = itemOffset + itemsPerPage;
	  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	  const currentItems = allProperties.slice(itemOffset, endOffset);
	  const pageCount = Math.ceil(allProperties.length / itemsPerPage);
  
  
		// Invoke when user click to request another page.
	const handlePageClick = (event) => {
	  const newOffset = (event.selected * itemsPerPage) % allProperties.length;
	  console.log(
		`User requested page number ${event.selected}, which is offset ${newOffset}, item : ${itemsPerPage}`
	  );
	  setItemOffset(newOffset);
	};

  return (
    <>
		<Header/>
        			

			
            {/* <!-- ============================ All Property ================================== --> */}
			<section class="gray-simple">
			
				<div class="container">
				
					<div class="row">
						<div class="col-lg-12 col-md-12">
							<div class="filter_search_opt">
								<a href="javascript:void(0);" class="btn btn-dark full-width mb-4" onclick="openFilterSearch()">
									<span class="svg-icon text-light svg-icon-2hx me-2">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor"/>
										</svg>
									</span>Open Filter Option
								</a>
							</div>
						</div>
					</div>
					
					<div class="row">
					
						{/* <!-- property Sidebar --> */}
						
						{/* <div class="col-lg-4 col-md-12 col-sm-12">
							<div class="simple-sidebar sm-sidebar" id="filter_search"  >							
							
								<div class="search-sidebar_header">
									<h4 class="ssh_heading">Close Filter</h4>
									<button onclick="closeFilterSearch()" class="w3-bar-item w3-button w3-large"><i class="fa-regular fa-circle-xmark fs-5 text-muted-2"></i></button>
								</div>
								
								
								<div class="sidebar-widgets">
									
									<div class="search-inner p-0">
										
										<div class="filter-search-box">
											<div class="form-group">
												<div class="position-relative">
													<input type="text" class="form-control rounded-3 ps-5" placeholder="Search by space name…"/>
													<div class="position-absolute top-50 start-0 translate-middle-y ms-2">
														<span class="svg-icon text-primary svg-icon-2hx">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"/>
																<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"/>
															</svg>
														</span>	
													</div>
												</div>
											</div>
										</div>
										
										<div class="position-relative d-flex flex-xl-row flex-column align-items-center">
											<div class="verifyd-prt-block flex-fill full-width my-1 me-1">
												<div class="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
													<div class="eliok-cliops d-flex align-items-center">
														<span class="svg-icon text-success svg-icon-2hx">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"/>
																<path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor"/>
															</svg>
														</span><span class="text-muted-2 fw-medium ms-1">Verified</span>
													</div>
													<div class="form-check form-switch">
														<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
														<label class="form-check-label" for="flexSwitchCheckChecked"></label>
													</div>
												</div>
											</div>
											
											<div class="super-agt-block flex-fill full-width my-1 ms-1">
												<div class="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
													<div class="eliok-cliops d-flex align-items-center">
														<span class="svg-icon text-warning svg-icon-2hx">
															<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
																<path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor"/>
																<path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white"/>
															</svg>
														</span><span class="text-muted-2 fw-medium ms-1">SuperAgent</span>
													</div>
													<div class="form-check form-switch">
														<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
														<label class="form-check-label" for="flexSwitchCheckChecked"></label>
													</div>
												</div>
												
											</div>
										</div>
										
										<div class="filter_wraps">
											
											
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#where" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Where<span class="selected">Chicago</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="where" data-parent="#where">
													<div class="side-list no-border">
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="b1" class="form-check-input" name="where" type="radio"/>
																			<label for="b1" class="form-check-label">Atlanta</label>
																		</li>
																		<li class="form-check">
																			<input id="b2" class="form-check-input" name="where" type="radio"/>
																			<label for="b2" class="form-check-label">Austin</label>
																		</li>
																		<li class="form-check">
																			<input id="b3" class="form-check-input" name="where" type="radio"/>
																			<label for="b3" class="form-check-label">Boston</label>
																		</li>
																		<li class="form-check">
																			<input id="b4" class="form-check-input" name="where" type="radio" checked/>
																			<label for="b4" class="form-check-label">Chicago</label>
																		</li>
																		<li class="form-check">
																			<input id="b5" class="form-check-input" name="where" type="radio"/>
																			<label for="b5" class="form-check-label">Dallas</label>
																		</li>
																		<li class="form-check">
																			<input id="b6" class="form-check-input" name="where" type="radio"/>
																			<label for="b6" class="form-check-label">Denver</label>
																		</li>
																		<li class="form-check">
																			<input id="b7" class="form-check-input" name="where" type="radio"/>
																			<label for="b7" class="form-check-label">Houston</label>
																		</li>
																		<li class="form-check">
																			<input id="b8" class="form-check-input" name="where" type="radio"/>
																			<label for="b8" class="form-check-label">Jacksonville</label>
																		</li>
																		<li class="form-check">
																			<input id="b9" class="form-check-input" name="where" type="radio"/>
																			<label for="b9" class="form-check-label">Los Angeles</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>


											
										
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#fptype" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Property Types<span class="selected">Apartment</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="fptype" data-parent="#fptype">
													<div class="side-list no-border">
														
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="c1" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c1" class="form-check-label">House</label>
																		</li>
																		<li class="form-check">
																			<input id="c2" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c2" class="form-check-label">Office Desk</label>
																		</li>
																		<li class="form-check">
																			<input id="c3" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c3" class="form-check-label">Villa</label>
																		</li>
																		<li class="form-check">
																			<input id="c4" class="form-check-input" name="ptype" type="radio" checked/>
																			<label for="c4" class="form-check-label">Apartment</label>
																		</li>
																		<li class="form-check">
																			<input id="c5" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c5" class="form-check-label">Condo</label>
																		</li>
																		<li class="form-check">
																			<input id="c6" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c6" class="form-check-label">Denver</label>
																		</li>
																		<li class="form-check">
																			<input id="c7" class="form-check-input" name="ptype" type="radio"/>
																			<label for="c7" class="form-check-label">Studio</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#fbedrooms" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Bedrooms<span class="selected">2 Beds</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="fbedrooms" data-parent="#fbedrooms">
													<div class="side-list no-border">
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="a1" class="form-check-input" name="bed" type="radio"/>
																			<label for="a1" class="form-check-label">01 Bedrooms</label>
																		</li>
																		<li class="form-check">
																			<input id="a2" class="form-check-input" name="bed" type="radio"/>
																			<label for="a2" class="form-check-label">02 Bedrooms</label>
																		</li>
																		<li class="form-check">
																			<input id="a3" class="form-check-input" name="bed" type="radio"/>
																			<label for="a3" class="form-check-label">03 Bedrooms</label>
																		</li>
																		<li class="form-check">
																			<input id="a4" class="form-check-input" name="bed" type="radio" checked/>
																			<label for="a4" class="form-check-label">04 Bedrooms</label>
																		</li>
																		<li class="form-check">
																			<input id="a5" class="form-check-input" name="bed" type="radio"/>
																			<label for="a5" class="form-check-label">05 Bedrooms</label>
																		</li>
																		<li class="form-check">
																			<input id="a6" class="form-check-input" name="bed" type="radio"/>
																			<label for="a6" class="form-check-label">06+ Bedrooms</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#fprice" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Price Range<span class="selected">$10,000 - $15,000</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="fprice" data-parent="#fprice">
													<div class="side-list no-border">
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="e1" class="form-check-input" name="prices" type="radio"/>
																			<label for="e1" class="form-check-label">Less Then $10,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e2" class="form-check-input" name="prices" type="radio"/>
																			<label for="e2" class="form-check-label">$10,000 - $15,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e3" class="form-check-input" name="prices" type="radio"/>
																			<label for="e3" class="form-check-label">$12,000 - $25,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e4" class="form-check-input" name="prices" type="radio" checked/>
																			<label for="e4" class="form-check-label">$30,000 - $35,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e5" class="form-check-input" name="prices" type="radio"/>
																			<label for="e5" class="form-check-label">$40,000 - $45,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e6" class="form-check-input" name="prices" type="radio"/>
																			<label for="e6" class="form-check-label">$50,000 - $55,000</label>
																		</li>
																		<li class="form-check">
																			<input id="e7" class="form-check-input" name="prices" type="radio"/>
																			<label for="e7" class="form-check-label">$60,000 - $65,000</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#mood" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Mood<span class="selected">Any Mood</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="mood" data-parent="#mood">
													<div class="side-list no-border">
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="f1" class="form-check-input" name="moods" type="radio"/>
																			<label for="f1" class="form-check-label">Any Mood</label>
																		</li>
																		<li class="form-check">
																			<input id="f2" class="form-check-input" name="moods" type="radio"/>
																			<label for="f2" class="form-check-label">Professional</label>
																		</li>
																		<li class="form-check">
																			<input id="f3" class="form-check-input" name="moods" type="radio"/>
																			<label for="f3" class="form-check-label">Essentials</label>
																		</li>
																		<li class="form-check">
																			<input id="f4" class="form-check-input" name="moods" type="radio" checked/>
																			<label for="f4" class="form-check-label">Unique</label>
																		</li>
																		<li class="form-check">
																			<input id="f5" class="form-check-input" name="moods" type="radio"/>
																			<label for="f5" class="form-check-label">Lively</label>
																		</li>
																		<li class="form-check">
																			<input id="f6" class="form-check-input" name="moods" type="radio"/>
																			<label for="f6" class="form-check-label">Luxe</label>
																		</li>
																		<li class="form-check">
																			<input id="f7" class="form-check-input" name="moods" type="radio"/>
																			<label for="f7" class="form-check-label">Luxe</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											<div class="single_search_boxed">
												<div class="widget-boxed-header">
													<h4>
														<a href="#ameneties" data-bs-toggle="collapse" aria-expanded="false" role="button" class="collapsed">Ameneties<span class="selected">ADA Compliant</span></a>
													</h4>
													
												</div>
												<div class="widget-boxed-body collapse" id="ameneties" data-parent="#ameneties">
													<div class="side-list no-border">
														<div class="single_filter_card">
															<div class="card-body pt-0">
																<div class="inner_widget_link">
																	<ul class="no-ul-list filter-list">
																		<li class="form-check">
																			<input id="g1" class="form-check-input" name="ADA" type="checkbox" checked/>
																			<label for="g1" class="form-check-label">ADA Compliant</label>
																		</li>
																		<li class="form-check">
																			<input id="g2" class="form-check-input" name="Parking" type="checkbox"/>
																			<label for="g2" class="form-check-label">Parking Options</label>
																		</li>
																		<li class="form-check">
																			<input id="g3" class="form-check-input" name="Coffee" type="checkbox"/>
																			<label for="g3" class="form-check-label">Coffee Provided</label>
																		</li>
																		<li class="form-check">
																			<input id="g4" class="form-check-input" name="Mother" type="checkbox"/>
																			<label for="g4" class="form-check-label">Mother's Room</label>
																		</li>
																		<li class="form-check">
																			<input id="g5" class="form-check-input" name="Outdoor" type="checkbox"/>
																			<label for="g5" class="form-check-label">Outdoor Space</label>
																		</li>
																		<li class="form-check">
																			<input id="g6" class="form-check-input" name="Pet" type="checkbox"/>
																			<label for="g6" class="form-check-label">Pet Friendly</label>
																		</li>
																		<li class="form-check">
																			<input id="g7" class="form-check-input" name="Beauty" type="checkbox"/>
																			<label for="g7" class="form-check-label">Beauty & Message</label>
																		</li>
																		<li class="form-check">
																			<input id="g8" class="form-check-input" name="Bike" type="checkbox"/>
																			<label for="g8" class="form-check-label">Bike Parking</label>
																		</li>
																		<li class="form-check">
																			<input id="g9" class="form-check-input" name="Phone" type="checkbox"/>
																			<label for="g9" class="form-check-label">Phone Line</label>
																		</li>
																		<li class="form-check">
																			<input id="g11" class="form-check-input" name="Private" type="checkbox"/>
																			<label for="g11" class="form-check-label">Private Areas</label>
																		</li>
																		<li class="form-check">
																			<input id="g12" class="form-check-input" name="Free" type="checkbox"/>
																			<label for="g12" class="form-check-label">Free WiFi</label>
																		</li>
																		<li class="form-check">
																			<input id="g13" class="form-check-input" name="Swiming" type="checkbox"/>
																			<label for="g13" class="form-check-label">Swiming Pool</label>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
										</div>
										
										<div class="form-group filter_button">
											<button type="submit" class="btn btn btn-primary rounded full-width">22 Results Show</button>
										</div>
									</div>							
								</div>
							</div>
							
						
						</div> */}
						
						<div class="col-lg-12 col-md-12 col-sm-12">
							
							<div class="row justify-content-center">
								<div class="col-lg-12 col-md-12">
									<div class="item-shorting-box">
										<div class="item-shorting clearfix">
											<div class="left-column pull-left"><h4 class="fs-6 m-0">Found {itemOffset}-{endOffset} of {allProperties.length} Results</h4></div>
										</div>
										<div class="item-shorting-box-right">
											<div class="shorting-by">
												<select id="shorty" class="form-control">
													<option value="">Filter</option>
													<option value="1">Low Price</option>
													<option value="2">High Price</option>
													<option value="3">Most Popular</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							{/* <Loader/> */}
							{loading ? <Loader/> : 
							<>
							<div class="row justify-content-center g-4">
								
								{currentItems?.map((item, index) => (

								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div class="property-listing card border-0 rounded-3">
									
									<div class="listing-img-wrapper p-3">
										<div class="list-img-slide position-relative">
											<div class="position-absolute top-0 left-0 ms-3 mt-3 z-1">
												<div class="label bg-success text-light d-inline-flex align-items-center justify-content-center">
													<span class="svg-icon text-light svg-icon-2hx me-1">
														<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"></path>
															<path d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z" fill="currentColor"></path>
														</svg>
													</span>Verified
												</div>
											</div>
											<div class="click rounded-3 overflow-hidden mb-0">
											<div><img style={{height:240}} src={item?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" /></div>
												{/* <div><a href="single-property-1.html"><img src="assets/img/p-9.jpg" class="img-fluid" alt="" /></a></div>
												<div><a href="single-property-1.html"><img src="assets/img/p-10.jpg" class="img-fluid" alt="" /></a></div> */}
											</div>
										</div>
									</div>
									
									<div class="listing-caption-wrapper px-3">
										<div class="listing-detail-wrapper">
											<div class="listing-short-detail-wrap">
												<div class="listing-short-detail">
													<div class="d-flex align-items-center">
														<span class="label bg-light-success text-success prt-type me-2">For {type == "rent" ? "Rent" : "Sale"}</span><span class="label bg-light-purple text-purple property-cats">Apartment</span>
													</div>
													<h4 style={{cursor:'pointer'}} onClick={() => navigate(`/property_details/${item.user_id}/${item.id}`)} class="listing-name fw-semibold fs-5 mb-1">{item.apartment_name}</h4>
													<div style={{
														whiteSpace:"nowrap",
														overflow:"hidden",
														textOverflow:"ellipsis"
													}} class="prt-location text-muted-2">
														<span class="svg-icon svg-icon-2hx">
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
																<path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
															</svg>
														</span>
														{item.locality}
													</div>
												</div>
											</div>
										</div>
										
										<div class="price-features-wrapper">
											<div class="list-fx-features d-flex align-items-center justify-content-between">
												<div class="listing-card d-flex align-items-center">
													<div class="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i class="fa-solid fa-building-shield fs-xs"></i></div><span class="text-muted-2 fs-sm">{item.bhk_type}</span>
												</div>
												<div class="listing-card d-flex align-items-center">
													<div class="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i class="fa-solid fa-bed fs-xs"></i></div><span class="text-muted-2 fs-sm">{item.beds} Beds</span>
												</div>
												<div class="listing-card d-flex align-items-center">
													<div class="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i class="fa-solid fa-clone fs-xs"></i></div><span class="text-muted-2 fs-sm">{item.propert_size}</span>
												</div>
											</div>
										</div>
										
										<div class="listing-detail-footer d-flex align-items-center justify-content-between py-4">
											<div class="listing-short-detail-flex">
												<h6 class="listing-card-info-price m-0">{item.currency}{item.selling_price}</h6>
											</div>
											<div class="footer-flex">
												<a href="property-detail.html" class="prt-view">
													<span class="svg-icon text-primary svg-icon-2hx">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z" fill="currentColor"/>
															<path opacity="0.3" d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z" fill="currentColor"/>
														</svg>
													</span>
												</a>
											</div>
										</div>
									
									</div>
									
								</div>
							</div>
								))}
							
							</div>
	

									<ReactPaginate
                                        nextLabel="->"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={pageCount}
                                        itemsPerPage={10}
                                        previousLabel="<-"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />
							</>
						}
						</div>

						
					</div>
				</div>	
			</section>
			{/* <!-- ============================ All Property ================================== --> */}
			
			<Footer/>
    </>
  )
}

export default AllProperties