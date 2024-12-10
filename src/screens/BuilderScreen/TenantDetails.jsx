import React,{useState, useEffect} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useLocation } from 'react-router-dom'
import { apartment_user_details } from '../../api/auth'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader'

function TenantDetails() {
    const {state} = useLocation()
    const [loading, setLoading] = useState(false);
    const [fullData, setFullData] = useState({});
    const [extension, setExtension] = useState({});
    const [notify, setNotify] = useState({});
    console.log(state)

    
    useEffect(() => {
      getProperty();
    }, []);
  
    const getProperty = async () => {
      setLoading(true);
      const res = await apartment_user_details({
        id: state.id,
      });
      setLoading(false);
      console.log(res);
      if (res.status) {
        setFullData(res.data);
        if(res?.property_extension !=  null){
          // setExtension(res.property_notify);
          setExtension(res.property_extension);
        }
        if(res?.property_notify !=  null){
          setNotify(res.property_notify);
        }
      }
    };
  
    if (loading) {
      return <ScreenLoader />;
    }

  return (
    <div>
        <Header/>
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
                        <strong>Name:</strong>
                        {fullData?.user_name}
                      </li>
                      <li>
                        <strong>Since:</strong>
                        {fullData?.rented_on}
                      </li>
                      <li>
                        {/* <strong>Apartment Address:</strong> */}
                        {fullData?.user_email} | {fullData?.user_mobile}
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
                        <strong> Apartment Name:</strong>
                        {fullData?.properties?.apartment_name}
                      </li>
                      <li>
                        <strong>Unit Number:</strong>
                        {fullData?.properties?.apartment_no}
                      </li>
                      <li>
                        <strong>Apartment Address:</strong>
                        {fullData?.properties?.locality}
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
            {extension && Object.keys(extension).length > 0 ? 
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
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
          </div>: <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
            <div class="like_share_wrap b-0">
              
              <p style={{ color: "#363636", marginTop: "20px" }}>
                <span style={{ color: "red" }}>Note:</span> No Request
              </p>
            </div>
          </div>}

              {notify && Object.keys(notify).length > 0 ?
              <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
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
            </div>: <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
            <div class="like_share_wrap b-0">
              
              <p style={{ color: "#363636", marginTop: "20px" }}>
                <span style={{ color: "red" }}>Note:</span> No Request
              </p>
            </div>
          </div>}

            {/* {extension && Object.keys(extension).length == 0 || notify && Object.keys(notify).length == 0 &&
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
            <div class="like_share_wrap b-0">
              
              <p style={{ color: "#363636", marginTop: "20px" }}>
                <span style={{ color: "red" }}>Note:</span> No Request
              </p>
            </div>
          </div>} */}

            {/* {notify && Object.keys(notify).length == 0 &&
            <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
            <div class="like_share_wrap b-0">
              
            </div>
          </div>} */}

          </div>
        </div>
      </section>
        <Footer/>
    </div>
  )
}

export default TenantDetails