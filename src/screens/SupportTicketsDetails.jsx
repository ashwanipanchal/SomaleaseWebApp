import React, { useState, useEffect } from "react";
import ScreenLoader from "../components/LoaderButton/ScreenLoader";
import {
  my_landlord,
  staff_list_builder,
  support_ticket_list_tenant,
} from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { owner_support_list2 } from "../api/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SupportTicketsDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [listOfStaff, setListOfStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
    const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await owner_support_list2({
      user_id: user_id.toString(),
      property_id: state,
    });
    setLoading(false)
    console.log(res);
    if (res.status) {
        setListOfStaff(res.get);
    }
  };


  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <Header />

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
              <div class="dashboard-wraper">
                {/* <!-- Bookmark Staff --> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  class="form-submit"
                >
                  <h4>Support Request</h4>
                  {/* <button
                    onClick={() =>
                      navigate("/my_account/tenant/create_ticket", {
                        state: listOfAprt,
                      })
                    }
                    style={{ marginBottom: "20px", backgroundColor: "#DC2F2E" }}
                  >
                    +
                  </button> */}
                </div>

                <div class="row mt-4">
                  {/* <!-- Single Staff --> */}
                  {listOfStaff?.map((i) => (
                    <div class="col-md-12 col-sm-12 col-md-12">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        class="singles-dashboard-list"
                      >
                        <div class="sd-list-right">
                          <div class="user_dashboard_listed">{i.bridgeid}</div>
                          <h4 class="listing_dashboard_title">
                            <a class="text-primary">{i?.title}</a>
                          </h4>
                          <div class="user_dashboard_listed">
                            {moment(i.created_at).format("ddd, d MMM YY")} at{" "}
                            {moment(i.created_at).format("hh:mm a")}
                          </div>
                        </div>

                        <div class="sd-list-right">
                          <h4 class="listing_dashboard_title">
                            <a class="text-primary">{i?.role}</a>
                          </h4>
                          <div class="user_dashboard_listed">
                            {/* <a href="" class="text-primary">{i?.apartment_name}</a> */}
                          </div>
                          <div
                            style={{
                              color: i?.status == 1 ?"green" : "#DC2F2E",
                            }}
                            class="user_dashboard_listed"
                          >
                            {i.status == 0
                              ? "Pending"
                              : i.status == 3
                              ? "Open"
                              : i.status == 4
                              ? "Reject"
                              : "Completed"}
                          </div>
                          <div
                            onClick={() =>
                                //TicketRequestDetails Screen
                              navigate(`ticket_details/${encodeURIComponent(i.title+"+"+i.id)}}`, {
                                state: i,
                              })
                            }
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            class="user_dashboard_listed"
                          >
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SupportTicketsDetails;
