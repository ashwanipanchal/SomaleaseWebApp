import React, { useState, useEffect } from "react";
import { properties_flat, tenant_side_documents } from "../api/auth";
import ScreenLoader from "../components/LoaderButton/ScreenLoader";
import C1 from "../assets/img/p-2.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
// import {  tenant_side_documents } from '../../api/auth';

const FlatList = () => {
  const navigate = useNavigate()
  const {option} = useParams()
  console.log(option)
  const { search, state } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');


console.log(id)

  const leadDetails = searchParams.get('lead_details');

  console.log(leadDetails, "========")

  const [listOfProperty, setListOfProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
    const user_id = localStorage.getItem("user_id");
    setLoading(true);
    const res = await properties_flat({
      propertie_id: id,
    });
    setLoading(false);
    console.log(res);
    if (res.status) {
      setListOfProperty(res.rent_propertie);
    }
  };

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <Header />
      {/* <div class="dashboard-wraper">
    <div class="form-submit">	
      <h4>Flat List</h4>
    </div>
    
    <div class="row">
    
                        {listOfProperty?.map((i) => (
      <div class="col-md-12 col-sm-12 col-md-12">
        <div class="singles-dashboard-list">
          <div class="sd-list-left">
            <img src={C1} class="img-fluid" alt="" />
          </div>
          <div class="sd-list-right">
            <h4 class="listing_dashboard_title"><a href="#" class="text-primary">{i?.user_name}</a></h4>
                                    <div class="user_dashboard_listed">
              <a href="" class="text-primary">{i?.apartment_name}</a>
            </div>
            <div class="user_dashboard_listed">
              {i.floor} - {i.bhk_type} - {i.apartment_no}
            </div>
            
            <div class="action">
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa-regular fa-comment"></i></a>
             
            </div>
          </div>
        </div>
      </div>))}
    </div>
    
  </div> */}
      {/* <!-- ============================ All Property ================================== --> */}
      <section class="gray-simple">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="filter_search_opt">
                <a
                  href=""
                  class="btn btn-dark full-width mb-4"
                  onclick="openFilterSearch()"
                >
                  <span class="svg-icon text-light svg-icon-2hx me-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Open Filter Option
                </a>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-5">
              <h3>Flat Lists</h3>
                <>
                  <div class="row g-4">
                    {listOfProperty?.map((i, index) => (
                      <div class="col-lg-6 col-md-12">
                        <div class="dashboard-wraper">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-md-12">
                              <div class="singles-dashboard-list mb-0">
                                <div class="sd-list-left">
                                  <img
                                    src={i?.propertie_image[0]?.gallery_image}
                                    class="img-fluid"
                                    alt=""
                                  />
                                </div>
                                <div class="sd-list-right">
                                  <h4 class="listing_dashboard_title">
                                    <a href="#" class="text-primary">
                                      {i?.apartment_name}
                                    </a>
                                  </h4>
                                  <div class="user_dashboard_listed">
                                      {i?.apartment_no}
                                  </div>
                                  <div class="user_dashboard_listed">
                                    {i.currency} { i.property_available == 2 ? i.selling_price : i.expected_rent}
                                  </div>
                                  <div class="user_dashboard_listed">
                                    {i.floor}
                                  </div>
                                  {i.tenent_name != "" ?
                                    <div class="user_dashboard_listed">
                                    Buyer Name: {i.tenent_name}
                                  </div> :
                                  <div class="user_dashboard_listed">
                                    &nbsp;
                                  </div>
                                  }
                                  {option == "flatlist" ? 
                                    <div class="action">
                                    <a
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Edit"
                                    >
                                      <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                  </div> : 
                                  option == "flatlist_leads" ? 

                                  <div class="action" onClick={() => navigate(`/my_account/builder/flatlist_leads/lead_details`, {state: {data: i, type: state}}) }>
                                    Leads
                                  </div> : null
                                  }
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ============================ All Property ================================== --> */}
      <Footer />
    </>
  );
};

export default FlatList;
