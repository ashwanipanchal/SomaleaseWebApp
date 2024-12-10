import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css"; // Assuming you have a CSS file for styling
import Modal from 'react-bootstrap/Modal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAllPropertiesRoute = location.pathname.includes('/my_account');
  const isHome = location.pathname.includes('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const ViewModal = () => setShowModal(true);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
  }
  useEffect(() => {
      function handleWindowResize() {
          setWindowSize(getWindowSize());
          // console.log(getWindowSize())
      }
      window.addEventListener('resize', handleWindowResize);

      return () => {
          window.removeEventListener('resize', handleWindowResize);
      };
  }, []);

  const toggleMobileMenu = () => {
    // console.log("here")
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header header-light head-shadow">
      <div className="container">
        <nav className="navigation navigation-landscape">
          <div className="nav-header">
            <a className="nav-brand text-logo" href="/">
              <span className="svg-icon text-primary svg-icon-2hx">
                <img style={{height:40}} src="https://somalease.com/admin/project/public/adminassets/assets/images/somalease-logo.png"/>
              </span>
              {/* <h5 className="fs-3 fw-bold ms-1 my-0">Somalease</h5> */}
            </a>
            <button
              className="nav-toggle"
              onClick={() => toggleMobileMenu()}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="6" width="16" height="3" rx="1.5" fill="currentColor" />
                  <rect
                    opacity="0.3"
                    y="12"
                    width="8"
                    height="3"
                    rx="1.5"
                    fill="currentColor"
                  />
                  <rect
                    opacity="0.3"
                    width="12"
                    height="3"
                    rx="1.5"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div  className={`nav-menus-wrapper ${isMobileMenuOpen ? "open" : ""}`}>
            <ul className="nav-menu">
              <li onClick={() => navigate("/")}>
                <a>
                  Home
                </a>
              </li>

              <li onClick={() => navigate("/all_properties/all")}>
                <a>
                  All Property
                </a>
              </li>
              <li onClick={() => navigate("/services")}>
                <a>
                  Services
                </a>
              </li>
              
              <li className={isAllPropertiesRoute && "active"} onClick={() => navigate("/my_account")}><a>My Account</a>
								</li>
            </ul>

            <ul className="nav-menu nav-menu-social align-to-right">
            <li style={{cursor:"pointer"}} onClick={() => navigate("/post_property")} class="add-listing">
									<a class="bg-primary me-2">
										<span class="svg-icon svg-icon-muted svg-icon-2hx me-1">
										</span>Post Property
									</a>
									<a class="bg-primary">
										<span class="svg-icon svg-icon-muted svg-icon-2hx me-1">
                      
										</span>Login
									</a>
								</li>
            {/* <li style={{cursor:"pointer"}} onClick={() => navigate("/post_property")} class="add-listing">
									<a class="bg-primary">
										<span class="svg-icon svg-icon-muted svg-icon-2hx me-1">
											<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.3" width="12" height="2" rx="1" transform="matrix(-1 0 0 1 15.5 11)" fill="currentColor"/>
												<path d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z" fill="currentColor"/>
												<path d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z" fill="currentColor"/>
											</svg>
										</span>Login
									</a>
								</li> */}
            </ul>
          </div>
        </nav>
      </div>

      <Modal show={showModal} onHide={closeModal}>
          <Modal.Body>
          <span className="mod-close" data-bs-dismiss="modal" aria-hidden="true">
            <span className="svg-icon text-primary svg-icon-2hx">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
              </svg>
            </span>
          </span>
          <div className="modal-body">
            {/* <h4 className="modal-header-title">Log In</h4> */}
            <div className="d-flex align-items-center justify-content-center mb-3">
              <img style={{height:60}} src ="https://somalease.com/admin/project/public/adminassets/assets/images/somalease-logo.png"/>
            </div> 
              <h4 style={{alignSelf:'center'}}>Log In</h4>
            <div className="login-form">
              <form>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" placeholder="name@example.com"/>
                  <label>Email address</label>
                </div>
                
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" placeholder="Password"/>
                  <label>Password</label>
                </div>
                
                <div className="form-group mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="flex-shrink-0 flex-first">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="save-pass" value="option1"/>
                        <label className="form-check-label" htmlFor="save-pass">Save Password</label>
                      </div>  
                    </div>
                    <div className="flex-shrink-0 flex-first">
                      <a href="#" className="link fw-medium">Forgot Password?</a>  
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <button type="button" className="btn btn-lg btn-primary fw-medium full-width rounded-2">LogIn</button>
                </div>
              </form>
            </div>
            <div className="modal-divider"><span>Or login via</span></div>
            <div className="social-login mb-3">
              <ul>
                <li><a href="#" className="btn connect-fb"><i className="ti-facebook"></i>Facebook</a></li>
                <li><a href="#" className="btn connect-google"><i className="ti-google"></i>Google+</a></li>
              </ul>
            </div>
            <div className="text-center">
              <p className="mt-4">Have't Any Account? <a href="create-account.html" className="link fw-medium">Create An Account</a></p>
            </div>
            </div>
          {/* </div>
        </div>
      </div>
    </div> */}
          </Modal.Body>
        </Modal>

    </header>
  );
};

export default Header;

// import React, { useState } from 'react';
// import './Header.css'; // Assuming styles are stored here

// const Header = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="header header-light head-shadow">
//       <div className="container">
//         <nav className="navigation navigation-landscape">
//           <div className="nav-header">
//             <a className="nav-brand text-logo" href="#">
//               <span className="svg-icon text-primary svg-icon-2hx">
//                 <img
//                   style={{ height: 40 }}
//                   src="https://somalease.com/admin/project/public/adminassets/assets/images/somalease-logo.png"
//                   alt="Somalease logo"
//                 />
//               </span>
//             </a>

//             {/* Hamburger Menu Icon for Mobile */}
//             <button
//               className="nav-toggle"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle navigation"
//             >
//               <span className="hamburger-icon">
//                 <svg
//                   width="22"
//                   height="22"
//                   viewBox="0 0 16 15"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <rect y="6" width="16" height="3" rx="1.5" fill="currentColor" />
//                   <rect
//                     opacity="0.3"
//                     y="12"
//                     width="8"
//                     height="3"
//                     rx="1.5"
//                     fill="currentColor"
//                   />
//                   <rect
//                     opacity="0.3"
//                     width="12"
//                     height="3"
//                     rx="1.5"
//                     fill="currentColor"
//                   />
//                 </svg>
//               </span>
//             </button>
//           </div>

//           {/* Mobile Menu Wrapper */}
//           <div
//             className={`nav-menus-wrapper ${isMobileMenuOpen ? 'open' : ''}`}
//           >
//             <ul className="nav-menu">
//               <li onClick={() => navigate('/')}>
//                 <a>Home</a>
//               </li>
//               <li onClick={() => navigate('/all_properties/all')}>
//                 <a>All Property</a>
//               </li>
//               <li
//                 // className={isAllPropertiesRoute ? 'active' : ''}
//                 onClick={() => navigate('/my_account')}
//               >
//                 <a>My Account</a>
//               </li>
//             </ul>

//             <ul className="nav-menu nav-menu-social align-to-right">
//               <li
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => navigate('/post_property')}
//                 className="add-listing"
//               >
//                 <a className="bg-primary">
//                   <span className="svg-icon svg-icon-muted svg-icon-2hx me-1">
//                     <svg
//                       width="22"
//                       height="22"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <rect
//                         opacity="0.3"
//                         width="12"
//                         height="2"
//                         rx="1"
//                         transform="matrix(-1 0 0 1 15.5 11)"
//                         fill="currentColor"
//                       />
//                       <path
//                         d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z"
//                         fill="currentColor"
//                       />
//                       <path
//                         d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                   </span>
//                   Post Property
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
