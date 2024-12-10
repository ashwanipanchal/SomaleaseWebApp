import React,{useEffect, useState} from "react";
import logo from "../assets/img/somalease-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { OTP_verify } from "../api/auth";
import Footer from "../components/Footer";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login1, otp_verify } = useAuth();

  const login_handle = async (e) => {
    e.preventDefault();
    navigate("/home");
  };


  const showBasicAlert = () => {
    MySwal.fire({
      title: 'Enter the correct number',
      icon: 'error'
    });
  }
  const showBasicAlertOTP = (res) => {
    MySwal.fire({
      title: 'OTP sent succesfully',
      text: `${res.data.otp}`,
      icon: 'success'
    });
  }

  // const [phone, setPhone] = useState(""); // Full phone number with country code
  const [countryCode, setCountryCode] = useState(""); // Country code only

  const handlePhoneChange = (value, country) => {
    setPhone(value); // Full phone number with country code
    setCountryCode(country.dialCode); // Country code only
  };



  return (
    <>
      <div id="main-wrapper">
        {/*         
        <!-- ============================ Page Title Start================================== --> */}
        <div class="page-title">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <h2 class="ipt-title">Login</h2>
                {/* <span class="ipn-subtitle">Register On Resido Today</span> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ============================ Page Title End ================================== -->
        
        <!-- ============================ Signup Form Start ================================== --> */}
        <section class="gray-simple">
          <div class="container">
            {/* <!-- row Start --> */}
            <div class="row justify-content-center">
              {/* <!-- Single blog Grid --> */}
              <div class="col-xl-7 col-lg-8 col-md-9">
                <div class="card border-0 rounded-4 p-xl-4 p-lg-4 p-md-4 p-3">
                  <div class="simple-form">
                    <div class="form-header text-center mb-5">
                      <div class="effco-logo mb-2">
                        <a class="d-flex align-items-center justify-content-center">
                          <span class="svg-icon text-primary svg-icon-2hx">
                            <img
                              style={{
                                height: 100,
                                width: 200,
                                marginBottom: 20,
                              }}
                              src={logo}
                            />
                            {/* <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z" fill="currentColor"/>
                                                    <path opacity="0.3" d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z" fill="currentColor"/>
                                                </svg> */}
                          </span>
                        </a>
                      </div>
                      <h4 class="fs-2">Login On Somalease</h4>
                    </div>
                    <form>
                      <div class="row">
                        <div class="col-lg-12 col-md-12 mb-3">
                            <PhoneInput
                              country={"us"}
                             value={phone}
                              onChange={handlePhoneChange}
                            />
                        </div>

                      {/* <div>
                            <PhoneInput
                              country={"us"} // Default country
                              value={phone}
                              onChange={handlePhoneChange}
                            />
                            <p>Full Phone: {phone}</p>
                            <p>Country Code: +{countryCode}</p>
                            <p>Phone Without Code: {phone.replace(`+${countryCode}`, "")}</p>
                          </div> */}

                        {/* <div class="col-lg-12 col-md-12 mb-3">
                          <div class="form-group">
                            <label>Phone</label>
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              type="tel"
                              class="form-control"
                              placeholder="123 546 5847"
                            />
                          </div>
                        </div> */}
                        {submitStatus == true && (
                          <div class="col-lg-12 col-md-12 mb-3">
                            <div class="form-group">
                              <label>OTP</label>
                              <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                inputStyle={{
                                  backgroundColor: "#f8fbfd",
                                  color: "#000",
                                  width: 60,
                                  height: 60,
                                  border: "1px solid #eff3f6",
                                  margin: 10,
                                  borderRadius: 10,
                                  fontSize: 24,
                                }}
                                renderSeparator={<span>-</span>}
                                // inputType="number"
                                renderInput={(props) => <input {...props} />}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div class="form-group">
                        <button
                          type="submit"
                          onClick={async (e) => {
                            e.preventDefault();
                            // setLoading(true)
                            // console.log(phone)
                            // return
                            if (phone.length < 10) {
                              // alert("Entered number is incorrect")
                              showBasicAlert();
                              return;
                            } else {
                              if (submitStatus == false) {
                                const localNumber = phone.replace(countryCode, "")
                                // console.log({
                                //   phone: localNumber,
                                //   country_code: countryCode,
                                // })
                                // return
                                const res = await login1({
                                  phone: localNumber,
                                  country_code:  `+${countryCode}`,
                                });
                                console.log(res);
                                if (res.status) {
                                  setSubmitStatus(true);
                                  showBasicAlertOTP(res);
                                }
                              } else {
                                // alert("alert after otp")
                                const localNumber = phone.replace(countryCode, "")
                                const res = await otp_verify({
                                  phone: localNumber,
                                  otp: otp,
                                  country_code: `+${countryCode}`,
                                  // device_id: DeviceInfo.getDeviceId(),
                                  // device_token: Global.fcmtoken,
                                  // device_type: Platform.OS === 'ios' ? 'ios' : 'Android',
                                  model_name: "",
                                  email: "",
                                  type: "1",
                                  user_type: "1",
                                });
                                console.log(res);
                                if (res.status) {
                                  navigate("/");
                                }
                              }
                            }
                          }}
                          class="btn btn-danger full-width fw-medium"
                        >
                          {submitStatus == false ? "Submit" : "Login"}
                          <i class="fa-solid fa-arrow-right-long ms-2"></i>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* <div class="modal-divider"><span>Or SignUp via</span></div>
                            <div class="social-login mb-3">
                                <ul>
                                    <li><a href="#" class="btn connect-fb"><i class="ti-facebook"></i>Facebook</a></li>
                                    <li><a href="#" class="btn connect-google"><i class="ti-google"></i>Google+</a></li>
                                </ul>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ============================ Signup Form End ================================== --> */}

        {/* <!-- ============================ Call To Action ================================== --> */}
        <section class="theme-bg call-to-act-wrap">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="call-to-act">
                  <div class="call-to-act-head">
                    <h3>Want to Become a Real Estate Agent?</h3>
                    <span>We'll help you to grow your career and growth.</span>
                  </div>
                  <a href="#" class="btn btn-call-to-act">
                    SignUp Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ============================ Call To Action End ================================== --> */}

        <Footer />

        {/* <!-- Log In Modal --> */}
        <div
          class="modal fade"
          id="login"
          tabindex="-1"
          role="dialog"
          aria-labelledby="registermodal"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered login-pop-form"
            role="document"
          >
            <div class="modal-content" id="registermodal">
              <span
                class="mod-close"
                data-bs-dismiss="modal"
                aria-hidden="true"
              >
                <span class="svg-icon text-primary svg-icon-2hx">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="10"
                      fill="currentColor"
                    />
                    <rect
                      x="7"
                      y="15.3137"
                      width="12"
                      height="2"
                      rx="1"
                      transform="rotate(-45 7 15.3137)"
                      fill="currentColor"
                    />
                    <rect
                      x="8.41422"
                      y="7"
                      width="12"
                      height="2"
                      rx="1"
                      transform="rotate(45 8.41422 7)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </span>
              <div class="modal-body">
                <h4 class="modal-header-title">Log In</h4>
                <div class="d-flex align-items-center justify-content-center mb-3">
                  <span class="svg-icon text-primary svg-icon-2hx">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div class="login-form">
                  <form>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="name@example.com"
                      />
                      <label>Email address</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                      />
                      <label>Password</label>
                    </div>

                    <div class="form-group mb-3">
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="flex-shrink-0 flex-first">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="save-pass"
                              value="option1"
                            />
                            <label class="form-check-label" for="save-pass">
                              Save Password
                            </label>
                          </div>
                        </div>
                        <div class="flex-shrink-0 flex-first">
                          <a href="#" class="link fw-medium">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-lg btn-primary fw-medium full-width rounded-2"
                      >
                        LogIn
                      </button>
                    </div>
                  </form>
                </div>
                <div class="modal-divider">
                  <span>Or login via</span>
                </div>
                <div class="social-login mb-3">
                  <ul>
                    <li>
                      <a href="#" class="btn connect-fb">
                        <i class="ti-facebook"></i>Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" class="btn connect-google">
                        <i class="ti-google"></i>Google+
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="text-center">
                  <p class="mt-4">
                    Have't Any Account?{" "}
                    <a href="create-account.html" class="link fw-medium">
                      Acreate An Account
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a id="back2Top" class="top-scroll" title="Back to top" href="#">
          <i class="ti-arrow-up"></i>
        </a>
      </div>
    </>
  );
}

export default Login;
