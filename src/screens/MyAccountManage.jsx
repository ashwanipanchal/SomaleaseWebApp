import React, { useEffect, useState } from 'react'

import DP from '../assets/img/team-1.jpg'
import C1 from '../assets/img/p-1.jpg'
import C2 from '../assets/img/p-2.jpg'
import C3 from '../assets/img/p-3.jpg'
import C4 from '../assets/img/p-4.jpg'
import C5 from '../assets/img/p-5.jpg'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import useAuth from "../hooks/useAuth";
import { profile, profile_update, user_type_update } from '../api/auth'
import LoaderButton from '../components/LoaderButton/LoaderButton'
import { toast, ToastContainer } from 'react-toastify'
import InterestProperties from '../components/InterestProperties'
import Footer from '../components/Footer'
import Header from '../components/Header'
import RaadReeb from '../components/RaadReeb'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Tenants from '../components/AccountManageComponents/Tenants'
import Owner from '../components/AccountManageComponents/Owner'
import Builder from '../components/AccountManageComponents/Builder'
import MyApartments from '../components/AccountManageComponents/TenantComponents/MyApartments'

import MyProperties from './OwnerScreen/MyProperties'
import MyBuyers from './BuilderScreen/MyBuyers'
import MyDocuments from './TenantScreens/MyDocuments'
import MyStaff from './OwnerScreen/MyStaff'
import MyPropertiesBuilderSide from './BuilderScreen/MyPropertiesBuilderSide'
import MyTenants from './OwnerScreen/MyTenants'
import NotifyTenants from './OwnerScreen/NotifyTenents'
import ConnectWithLanlord from './TenantScreens/ConnectWithLanlord'
import SupportRequest from './TenantScreens/SupportRequest'
import MyStaffBuilder from './BuilderScreen/MyStaffBuilder'
import MyApartmentsTenant from './TenantScreens/MyApartments'
import MyStaffOwnerLandlord from './OwnerScreen/MyStaffOwnerLandlord'
import SupportRequestOwnerBuilder from './SupportRequestOwnerBuilder'
import MyCodkar from './BuilderScreen/MyCodkar'

function MyAccountManage() {
    const navigate = useNavigate()
	const {state} = useLocation()
	console.log(state)
    const {value} = useParams()
	// console.log(state)
    const [positions, setPostion] = useState(1)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const { login1, otp_verify, logout, User_Type_Update } = useAuth();

    useEffect(() => {
		let pos = localStorage.getItem("deep_position");
		if(pos != null) {
			setPostion(pos)
		}
        getValue()
    },[])

    const getValue = async() => {
        const id = localStorage.getItem("user_id")
        const res =  await User_Type_Update({
            user_type: state,
            id: id.toString(),
          })
        //   console.log(res)
          if(res.status){
          }
    }

	const updatePosition = async(value) => {
		setPostion(value)
	}

  return (
    <>
        <Header/>
            {/* <!-- ============================ User Dashboard ================================== --> */}
			<section class="bg-light mt-40">
				<div class="container-fluid">
				
					<div class="row">
						<div class="col-lg-12 col-md-12 mt-4">
							<div class="filter_search_opt">
								<a href="javascript:void(0);" onclick="openFilterSearch()" class="btn btn-dark full-width mb-4">Dashboard Navigation<i class="fa-solid fa-bars ms-2"></i></a>
							</div>
						</div>
					</div>
								
					<div class="row">
						
						<div class="col-lg-3 col-md-12">
							<div class="simple-sidebar sm-sidebar" id="filter_search">
								
								<div class="search-sidebar_header">
									<h4 class="ssh_heading">Close Filter</h4>
									<button onclick="closeFilterSearch()" class="w3-bar-item w3-button w3-large"><i class="fa-regular fa-circle-xmark fs-5 text-muted-2"></i></button>
								</div>
								
								<div class="sidebar-widgets">
									<div class="dashboard-navbar">
										{
											state == "3" ? 
												<Tenants updatePosition={updatePosition}/> : state == "1" ?
													<Owner updatePosition={updatePosition}/> : <Builder updatePosition={updatePosition}/>
												
										}
										
									</div>
								</div>
								
							</div>
						</div>
						
                        {positions == 1 && (
                            <div class="col-lg-9 col-md-12">
								{state == "3" ? <MyApartments/> : state == "1" ? <MyProperties/> : <MyBuyers/>}
								
							</div>
                        )}

                        {positions == 2 && (
                            <div class="col-lg-9 col-md-12">
								{state == "3" ? <MyDocuments type={3} /> : state == "1" ? <MyStaffOwnerLandlord/> : <MyCodkar/> }
							</div>
                        )}
                        {positions == 3 && (
                            <div class="col-lg-9 col-md-12">
								{state == "3" ? <MyApartments/> : state == "1" ? <MyTenants/> : <MyPropertiesBuilderSide/>}
							</div>
                        )}
                        {positions == 4 && (
                            <div class="col-lg-9 col-md-12">
								{state == "3" ? <SupportRequest/>  : state == "1" ? <NotifyTenants/> : <MyStaffBuilder/> }
							</div>
                        )}
                        {positions == 5 && (
                            <div class="col-lg-9 col-md-12">
								{state == "3"? <ConnectWithLanlord/>: <MyDocuments type={1} /> }
							</div>
                        )}
                        {positions == 6 && (
                            <div class="col-lg-9 col-md-12">
								{state == "4" && <MyDocuments type={2} />}
							</div>
                        )}
                        {positions == 7 && (
                            <div class="col-lg-9 col-md-12">
								{state == "1" && <SupportRequestOwnerBuilder type={1}/>}
								{state == "4" && <SupportRequestOwnerBuilder type={2}/>}
							</div>
                        )}

                        
						
						

						
					</div>
				</div>
			</section>
			{/* <!-- ============================ User Dashboard End ================================== --> */}

			<Footer/>			
            <ToastContainer />
    </>
  )
}

export default MyAccountManage

// import React, { useEffect, useState } from 'react'

// import DP from '../assets/img/team-1.jpg'
// import C1 from '../assets/img/p-1.jpg'
// import C2 from '../assets/img/p-2.jpg'
// import C3 from '../assets/img/p-3.jpg'
// import C4 from '../assets/img/p-4.jpg'
// import C5 from '../assets/img/p-5.jpg'
// import withReactContent from 'sweetalert2-react-content';
// import Swal from 'sweetalert2';
// import useAuth from "../hooks/useAuth";
// import { profile, profile_update, user_type_update } from '../api/auth'
// import LoaderButton from '../components/LoaderButton/LoaderButton'
// import { toast, ToastContainer } from 'react-toastify'
// import InterestProperties from '../components/InterestProperties'
// import Footer from '../components/Footer'
// import Header from '../components/Header'
// import RaadReeb from '../components/RaadReeb'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import Tenants from '../components/AccountManageComponents/Tenants'
// import Owner from '../components/AccountManageComponents/Owner'
// import Builder from '../components/AccountManageComponents/Builder'
// import MyApartments from '../components/AccountManageComponents/TenantComponents/MyApartments'
// import MyProperties from './OwnerScreen/MyProperties'
// import MyBuyers from './BuilderScreen/MyBuyers'
// import MyDocuments from './TenantScreens/MyDocuments'
// import MyStaff from './OwnerScreen/MyStaff'
// import MyPropertiesBuilderSide from './BuilderScreen/MyPropertiesBuilderSide'
// import MyTenants from './OwnerScreen/MyTenants'
// import NotifyTenants from './OwnerScreen/NotifyTenents'
// import ConnectWithLanlord from './TenantScreens/ConnectWithLanlord'
// import SupportRequest from './TenantScreens/SupportRequest'
// import MyStaffBuilder from './BuilderScreen/MyStaffBuilder'
// import SideBar from '../components/SideBar'

// function MyAccountManage() {
//     const navigate = useNavigate()
// 	const {state} = useLocation()
// 	console.log(state)
//     const {value} = useParams()
// 	// console.log(state)
//     const [positions, setPostion] = useState(1)
//     const [userName, setUserName] = useState("")
//     const [userEmail, setUserEmail] = useState("")
//     const [isLoading, setIsLoading] = useState(false);
//     const { login1, otp_verify, logout, User_Type_Update } = useAuth();

//     useEffect(() => {
//         getValue()
//     },[])

//     const getValue = async() => {
//         const id = localStorage.getItem("user_id")
//         const res =  await User_Type_Update({
//             user_type: state,
//             id: id.toString(),
//           })
//         //   console.log(res)
//           if(res.status){
//           }
//     }

// 	const updatePosition = async(value) => {
// 		setPostion(value)
// 	}

//   return (
//     <>
//         <Header/>
//             {/* <!-- ============================ User Dashboard ================================== --> */}
// 			<section class="bg-light mt-40">
// 				<div class="container-fluid">
				
// 					<div class="row">
// 						<div class="col-lg-12 col-md-12">
// 							<div class="filter_search_opt">
// 								<a href="javascript:void(0);" onclick="openFilterSearch()" class="btn btn-dark full-width mb-4">Dashboard Navigation<i class="fa-solid fa-bars ms-2"></i></a>
// 							</div>
// 						</div>
// 					</div>
								
// 					<div class="row">
						
// 						<SideBar state={state} updatePosition={updatePosition}/>
						
//                         {positions == 1 && (
//                             <div class="col-lg-9 col-md-12">
// 								{state == "3" ? <MyApartments/> : state == "1" ? <MyProperties/> : <MyBuyers/>}
								
// 							</div>
//                         )}

//                         {positions == 2 && (
//                             <div class="col-lg-9 col-md-12">
// 								{state == "3" ? <MyDocuments type={3} />: <MyStaff/> }
// 							</div>
//                         )}
//                         {positions == 3 && (
//                             <div class="col-lg-9 col-md-12">
// 								{state == "3" ? <MyApartments/> : state == "1" ? <MyTenants/> : <MyPropertiesBuilderSide/>}
// 							</div>
//                         )}
//                         {positions == 4 && (
//                             <div class="col-lg-9 col-md-12">
// 								{state == "3" ? <SupportRequest/>  : state == "1" ? <NotifyTenants/> : <MyStaffBuilder/> }
// 							</div>
//                         )}
//                         {positions == 5 && (
//                             <div class="col-lg-9 col-md-12">
// 								{state == "3" && <ConnectWithLanlord/>}
// 							</div>
//                         )}

                        
						
						

						
// 					</div>
// 				</div>
// 			</section>
// 			{/* <!-- ============================ User Dashboard End ================================== --> */}

// 			<Footer/>			
//             <ToastContainer />
//     </>
//   )
// }

// export default MyAccountManage