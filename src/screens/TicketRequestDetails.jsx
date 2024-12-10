import React, { useState, useEffect } from "react";
import PDF_Image from "../assets/img/pdf.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { add_notify_extension_owner, property_details, update_ticket_status_from_owner_builder } from "../api/auth";
import Loader from "../components/Loader";
import Collapsible from "react-collapsible";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "react-bootstrap/Modal";
import LoaderButton from "../components/LoaderButton/LoaderButton";
import { toast , ToastContainer} from "react-toastify";
import moment from "moment";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Stepper } from "react-form-stepper";

function TicketRequestDetails() {
    const navigate = useNavigate()
  const { state } = useLocation();
  console.log(state);
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const UpdateRequest = async(value) => {
    setLoading(true)
    const res =  await update_ticket_status_from_owner_builder({
        id: state?.id,
        status:value,
    })

    setLoading(false)
    console.log(res)
    if(res.status){

      const showAlert = async() => {
        MySwal.fire({
          title: "Status updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          }).then((result) => {
          if (result.isConfirmed) {
            // closeModal1()
            navigate(-1)
            }
          });
      }
    //   closeModal1()
      showAlert()
    }

  }

  
  return (
    <>
      <Header />
      <section class="gray-simple">
        <div class="container">
          <div class="row">
            {/* <!-- property main detail --> */}
            <div class="col-lg-8 col-md-12 col-sm-12 mt-4">
              {/* <!-- First --> */}
              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header"></div>
                <div
                  id="clOne"
                  class="panel-collapse collapse show"
                  aria-labelledby="clOne"
                >
                  <div class="block-body">
                    <ul class="deatil_features">
                      <li>
                        <strong>Name:</strong>
                        {state?.name}
                      </li>
                      <li>
                        <strong>Mobile No:</strong>
                        {state?.mobile}
                      </li>
                      <li>
                        <strong>Apartment:</strong>
                        {state?.address}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Second --> */}
              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  {/* <h4 class="property_block_title">Landlord Details</h4> */}
                </div>
                <div
                  id="clOne"
                  class="panel-collapse collapse show"
                  aria-labelledby="clOne"
                >
                  <div class="block-body">
                    <ul class="deatil_features">
                      <li>
                        <strong>Title:</strong>
                        {state?.title}
                      </li>
                      <li>
                        <strong>Description.:</strong>
                        {state?.description}
                      </li>
                      {/* <li>
                        <strong>Email:</strong>
                        {state?.property_owner_email}
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>

              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <h4 class="property_block_title">Photo</h4>
                </div>
                <div
                  id="clOne"
                  class="panel-collapse collapse show"
                  aria-labelledby="clOne"
                >
                  <div class="block-body">
                    <ul class="deatil_features">
                      <li>
                        <img style={{height:240, width:240}} src={state?.photos}/>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- property Sidebar --> */}
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
                {state?.status == 1 && (
                    <div class="like_share_wrap b-0">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <h6>Ticket Status</h6>
                    <h6 style={{backgroundColor:state.status == 1 ? "limegreen" : '#DC2F2E', color:'white', padding:10, borderRadius:10}}>Completed</h6>
                </div>
              </div>
                )}
                {state?.status == 4 && (
                    <div class="like_share_wrap b-0">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <h6>Ticket Status</h6>
                    <h6 style={{backgroundColor:state.status == 1 ? "limegreen" : '#DC2F2E', color:'white', padding:10, borderRadius:10}}>Reject</h6>
                </div>
              </div>
                )}
              

            {state?.status == 0 && (
                <div class="like_share_wrap b-0">
                <ul class="like_share_list">
                <div class="form-group col-md-6">
                <LoaderButton
                        title={"Accept"}
                        color={"green"}
                        hoverColor={"green"}
                        onClick={(e) => UpdateRequest(3)}
                        isLoading={loading}
                      />
                      </div>
                      <div class="form-group col-md-6">
                    <LoaderButton
                        title={"Reject"}
                        onClick={(e) => UpdateRequest(4)}
                        isLoading={loading}
                      />
                      </div>
                </ul>
            </div>
            )}

            {state?.status == 3 && (
                <div class="like_share_wrap b-0">
                <ul class="like_share_list">
                <div class="form-group col-md-8">
                        <select
                        //   value={building}
                        //   onChange={(e) => setBuilding(e.target.value)}
                          id="status"
                          class="form-control"
                        >
                           <option value="">Select</option>
                          {/* {buildingMaster?.map((i) => ( */}
                            <option value="completed">Completed</option>
                          {/* ))} */}
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                      <LoaderButton
                        title={"Save"}
                        onClick={(e) => UpdateRequest(1)}
                        isLoading={loading}
                      />
                      </div>
                </ul>
            </div>
            )}
              
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
      <Footer />
    </>
  );
}

export default TicketRequestDetails;
