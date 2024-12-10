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
import { Stepper } from "react-form-stepper";

function TicketDetailsTenant() {
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
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <h6>Ticket Status</h6>
                    <h6 style={{backgroundColor:state.status == 1 ? "limegreen" : '#DC2F2E', color:'white', padding:10, borderRadius:10}}>{
                        state.status == 0
                        ? 'Pending'
                        : state.status == 3
                        ? 'Open'
                        : state.status == 4
                        ? 'Reject'
                        : 'Completed'}</h6>
                </div>
                    <Stepper
                        steps={[{ label: 'Requested' }, { label: 'Accepted' }, { label: 'Completed' }]}
                        activeStep={0}
                        />
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

export default TicketDetailsTenant;
