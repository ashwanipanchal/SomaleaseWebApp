import React, { useState, useEffect } from "react";
import bed from "../../assets/img/bed.svg";
import bathtub from "../../assets/img/bathtub.svg";
import move from "../../assets/img/move.svg";
import C1 from "../../assets/img/p-1.jpg";
import C2 from "../../assets/img/p-2.jpg";
import C3 from "../../assets/img/p-3.jpg";
import C4 from "../../assets/img/p-4.jpg";
import PDF_Image from "../../assets/img/pdf.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useParams } from "react-router-dom";
import { add_notify_extension_owner, property_details } from "../../api/auth";
import Loader from "../../components/Loader";
import Collapsible from "react-collapsible";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "react-bootstrap/Modal";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { toast , ToastContainer} from "react-toastify";
import moment from "moment";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function ApartmentDetails() {
  const { state } = useLocation();
  console.log(state);
  let { user_id, id } = useParams();
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const [notifyDate, setNotifyDate] = useState("");
  const [notifyReason, setNotifyReason] = useState("");
  const [extnDate, setExtnDate] = useState("");
  const [extnReason, setExtnReason] = useState("");


  const [showHello1, setShowHello1] = useState(false);
  const [showHello2, setShowHello2] = useState(false);
  const closeModal1 = () => setShowHello1(false);
  const showModal1 = () => setShowHello1(true);
  const closeModal2 = () => setShowHello2(false);
  const showModal2 = () => setShowHello2(true);

  const notify_user = async(e) => {
    e.preventDefault()
    if(notifyDate == ""){
      toast.error('Please enter your valid date');
      return;
    }
    if(notifyReason == ""){
      toast.error('Please enter your valid reason');
      return;
    }

    setLoading(true)
    const id = localStorage.getItem("user_id")
    const res =  await add_notify_extension_owner({
      user_id: id,
      owner_id: state.property_owner_id,
      property_id: state.property_id,
      last_vacate: moment(notifyDate).format('YYYY-MM-DD'),
      your_vacate: moment(notifyDate).format('YYYY-MM-DD'),
      reason: notifyReason,
      type: "1",
    })

    setLoading(false)
    if(res.status){

      const showAlert = async() => {
        MySwal.fire({
          title: "Notification request sent successfully",
          icon: "success",
          confirmButtonText: "OK",
          }).then((result) => {
          if (result.isConfirmed) {
            closeModal1()
            }
          });
      }
      closeModal1()
      showAlert()
    }

  }

  const extn_user = async(e) => {
    e.preventDefault()

    if(extnDate == ""){
      toast.error('Please enter your valid date');
      return;
    }
    if(extnReason == ""){
      toast.error('Please enter your valid reason');
      return;
    }

    setLoading(true)
    const id = localStorage.getItem("user_id")
    const res =  await add_notify_extension_owner({
      user_id: id,
      owner_id: state.property_owner_id,
      property_id: state.property_id,
      last_vacate: moment(extnDate).format('YYYY-MM-DD'),
      your_vacate: moment(extnDate).format('YYYY-MM-DD'),
      reason: extnReason,
      type: "2",
    })

    setLoading(false)
    if(res.status){

      const showAlert = async() => {
        MySwal.fire({
          title: "Extension request sent successfully",
          icon: "success",
          confirmButtonText: "OK",
          }).then((result) => {
          if (result.isConfirmed) {
            closeModal1()
            }
          });
      }
      closeModal2()
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
              {/* <div class="property_block_wrap style-2 p-4">
								<div class="prt-detail-title-desc">
									<span class="label text-light bg-success">For {propertyDetail?.property_available == "2" ? "Sale" : "Rent"}</span>
									<h3>{propertyDetail?.apartment_name}</h3>
									<span><i class="lni-map-marker"></i> {propertyDetail?.locality}</span>
									<h3 class="prt-price-fix text-primary">{propertyDetail.currency}{propertyDetail.property_available == 1 ? propertyDetail.expected_rent : propertyDetail.selling_price}<sub>{propertyDetail?.property_available == "1" && "/month"} </sub></h3>
									<div class="list-fx-features">
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={bed} width="13" alt=""/></div>{propertyDetail.beds} Beds
										</div>
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={bathtub} width="13" alt=""/></div>{propertyDetail.bathrooms} Bath
										</div>
										<div class="listing-card-info-icon">
											<div class="inc-fleat-icon me-1"><img src={move} width="13" alt=""/></div>{propertyDetail.propert_size}
										</div>
									</div>
								</div>
							</div> */}

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
                        <strong>Apartment Name:</strong>
                        {state?.properties.apartment_name}
                      </li>
                      <li>
                        <strong>Unit Number:</strong>
                        {state?.properties.apartment_no}
                      </li>
                      <li>
                        <strong>Apartment Address:</strong>
                        {state?.properties.locality}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Second --> */}
              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <h4 class="property_block_title">Landlord Details</h4>
                </div>
                <div
                  id="clOne"
                  class="panel-collapse collapse show"
                  aria-labelledby="clOne"
                >
                  <div class="block-body">
                    <ul class="deatil_features">
                      <li>
                        <strong>Name:</strong>
                        {state?.property_owner_name}
                      </li>
                      <li>
                        <strong>Mobile No.:</strong>
                        {state?.property_owner_mobile}
                      </li>
                      <li>
                        <strong>Email:</strong>
                        {state?.property_owner_email}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Third --> */}
              <div class="property_block_wrap style-2">
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
              </div>

              {/* <!-- Fourth --> */}
              <div class="property_block_wrap style-2">
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
              </div>
            </div>

            {/* <!-- property Sidebar --> */}
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
              {/* <!-- Like And Share --> */}
              <div class="like_share_wrap b-0">
                <ul class="like_share_list">
                  <li onClick={() => showModal1()}>
                    <a
                      class="btn btn-likes"
                      data-toggle="tooltip"
                      data-original-title="Share"
                    >
                      Notify Owner
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => showModal2()}
                      class="btn btn-likes"
                      data-toggle="tooltip"
                      data-original-title="Save"
                    >
                      Extension Request
                    </a>
                  </li>
                </ul>
                <p style={{ color: "#363636", marginTop: "20px" }}>
                  <span style={{ color: "red" }}>Note:</span> If you wish to
                  move/vacate the unit before the time plz notify the landlord
                </p>
              </div>

              <div class="details-sidebar">
                {/* <!-- Agent Detail --> */}
                {/* <div class="sides-widget">
									<div class="sides-widget-header bg-primary">
										<div class="agent-photo"><img src="assets/img/user-6.png" alt=""/></div>
										<div class="sides-widget-details">
											<h4><a href="#">{propertyDetail?.user_name}</a></h4>
											<span><i class="lni-phone-handset"></i>{propertyDetail?.user_mobile}</span>
										</div>
										<div class="clearfix"></div>
									</div>
									
									<div class="sides-widget-body simple-form">
										<div class="form-group">
											<label>Email</label>
											<input type="text" class="form-control" placeholder="Your Email"/>
										</div>
										<div class="form-group">
											<label>Phone No.</label>
											<input type="text" class="form-control" placeholder="Your Phone"/>
										</div>
										<div class="form-group">
											<label>Description</label>
											<textarea class="form-control">I'm interested in this property.</textarea>
										</div>
										<button class="btn btn-light-primary fw-medium rounded full-width">Send Message</button>
									</div>
								</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
      <Footer />

      <Modal show={showHello1} onHide={closeModal1}>
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
      </Modal>
    </>
  );
}

export default ApartmentDetails;
