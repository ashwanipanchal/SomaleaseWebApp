import React, { useState, useEffect } from "react";
// import bed from "../../assets/img/bed.svg";
// import bathtub from "../../assets/img/bathtub.svg";
// import move from "../../assets/img/move.svg";
// import C1 from "../../assets/img/p-1.jpg";
// import C2 from "../../assets/img/p-2.jpg";
// import C3 from "../../assets/img/p-3.jpg";
// import C4 from "../../assets/img/p-4.jpg";
// import PDF_Image from "../../assets/img/pdf.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { add_notify_extension_owner, property_details, staff_details, staff_status_update_owner } from "../api/auth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "react-bootstrap/Modal";
import LoaderButton from "../components/LoaderButton/LoaderButton";
import { toast , ToastContainer} from "react-toastify";
import moment from "moment";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Stepper } from "react-form-stepper";
import ScreenLoader from "../components/LoaderButton/ScreenLoader";

function StaffDetails() {
    const navigate = useNavigate()
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullInfo, setFullInfo] = useState({});

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getInfo()
  },[])

  const getInfo = async() => {
    setIsLoading(true)
    const res =  await staff_details({
      id: state
    })

    setIsLoading(false)
    console.log(res)
    if(res.status){
        setFullInfo(res?.staff_list)
    }
  }

  const updateStatus = async(e) => {
    e.preventDefault()
    setLoading(true)
    const res =  await staff_status_update_owner({
      id: state,
      status: fullInfo.status == 0 ? "1" : "0",
    })

    setLoading(false)
    if(res.status){

      const showAlert = async() => {
        MySwal.fire({
          title: "Status changed successfully",
          icon: "success",
          confirmButtonText: "OK",
          }).then((result) => {
          if (result.isConfirmed) {
            navigate(-1)
            }
          });
      }
    //   closeModal1()
      showAlert()
    }

  }

  if(isLoading){
    return(
        <ScreenLoader/>
    )
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
                        {fullInfo?.name}
                      </li>
                      <li>
                        <strong>Email:</strong>
                        {fullInfo?.email_id}
                      </li>
                      <li>
                        <strong>Mobile No:</strong>
                        {fullInfo?.mobile}
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
                        <strong>Apartment/Building:</strong>
                        {fullInfo?.apartment_name}
                      </li>
                      <li>
                        <strong>Role:</strong>
                        {fullInfo?.role}
                      </li>
                      {/* <li>
                        <strong>Email:</strong>
                        {fullInfo?.property_owner_email}
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>

              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <h6 class="property_block_title">Responsibilities</h6>
                </div>
                <div
                  id="clOne"
                  class="panel-collapse collapse show"
                  aria-labelledby="clOne"
                >
                  <div class="block-body">
                  <ul class="avl-features third color">
                    {fullInfo?.responsibility?.split(',')?.map((i) => (
                        <li>{i}</li>
                    ))}
                </ul>
                    {/* <ul class="deatil_features">
                        {state?.responsibility?.split(',')?.map((i) => (
                            <li>
                                <p>{i}</p>
                            </li>
                        ))}
                     
                    </ul> */}
                  </div>
                </div>
              </div>

              {/* <!-- Third --> */}
              {/* <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#dsrp"
                    data-bs-target="#clTwo"
                    aria-controls="clTwo"
                    href="javascript:void(0);"
                    aria-expanded="true"
                  >
                    <h4 class="property_block_title">Agreement</h4>
                  </a>
                </div>
                <div id="clTwo" class="panel-collapse collapse show">
                  <div class="block-body">
                    <ul class="list-gallery-inline">
                      {state?.document_list?.map((i) => (
                        <li style={{ cursor: "pointer" }}>
                          <a href={i.document_file} target="_blank">
                            <img
                              src={PDF_Image}
                              class="img-fluid mx-auto"
                              alt=""
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* <!-- Fourth --> */}
              {/* <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#amen"
                    data-bs-target="#clThree"
                    aria-controls="clThree"
                    href="javascript:void(0);"
                    aria-expanded="true"
                  >
                    <h4 class="property_block_title">My Documents</h4>
                  </a>
                </div>

                <div id="clThree" class="panel-collapse collapse show">
                  <div class="block-body">
                    <ul class="list-gallery-inline">
                      {state?.user_document_list?.map((i) => (
                        <li style={{ cursor: "pointer" }}>
                          <a href={i.document_file} target="_blank">
                            <img
                              src={PDF_Image}
                              class="img-fluid mx-auto"
                              alt=""
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>

            {/* <!-- property Sidebar --> */}
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
              <div class="like_share_wrap b-0">
                <p>{state?.status == 0 ? "This person is not active to activate click the button down below" : "This person is active to deactivate click the button down below"}</p>
                <LoaderButton title={state?.status == 0 ? 'Active' : 'Inactive'} isLoading={loading} onClick={(e) => updateStatus(e)} />
                {/* <div style={{}}>
                    <h6 style={{backgroundColor:state.status == 0 ? 'green' : '#DC2F2E', color:'white', padding:10, borderRadius:10, textAlign:'center', cursor:'pointer'}}>
                    {state?.status == 0 ? 'Active' : 'Inactive'}</h6>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
      <Footer />

      {/* <Modal show={showHello1} onHide={closeModal1}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Notify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="form-group col-md-12">
              <label>Select your vacant date</label>
              <input type="date" value={notifyDate} onChange={(e) => setNotifyDate(e.target.value)} class="form-control" />
            </div>
            <div class="form-group col-md-12">
              <label>Reason</label>
              <textarea value={notifyReason} onChange={(e) => setNotifyReason(e.target.value)} class="form-control h-120"></textarea>
            </div>
            <div class="layout-button">
              <LoaderButton title={"Send"}isLoading={loading} onClick={e => notify_user(e)} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showHello2} onHide={closeModal2}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Extension Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="form-group col-md-12">
              <label>Select your extension date</label>
              <input type="date" value={extnDate} onChange={(e) => setExtnDate(e.target.value)} class="form-control" />
            </div>
            <div class="form-group col-md-12">
              <label>Reason</label>
              <textarea value={extnReason} onChange={(e) => setExtnReason(e.target.value)} class="form-control h-120"></textarea>
            </div>
            <div class="layout-button">
              <LoaderButton title={"Send"} isLoading={loading} onClick={(e) => extn_user(e)} />
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
}

export default StaffDetails;
