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
import { useNavigate } from 'react-router-dom'
import ScreenLoader from '../components/LoaderButton/ScreenLoader'

const RadioGroup = ({ options, name, onChange, selectedValue }) => {
	return (
	  <div className="radio-btn21">
		{options.map((option) => (
		  <label className="form-check-label" key={option.value} style={{ display: 'block', marginRight: '10px' }}>
			<input className="form-check-input me-2"
			  type="radio"
			  name={name}
			  value={option.value}
			  checked={selectedValue === option.value}
			  onChange={(e) => onChange(e.target.value)}
			/>
			{option.label}
		  </label>
		))}
	  </div>
	);
  };

function MyAccount() {
    const navigate = useNavigate()
    const [positions, setPostion] = useState(1)
    const [userData, setUserData] = useState({})
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const { login1, otp_verify, logout } = useAuth();


	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionChange = (value) => {
	  setSelectedOption(value);
	  console.log('Selected:', value);
	};
  
	const options = [
	  { label: 'Male', value: 'Male' },
	  { label: 'Female', value: 'Female' },
	];

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
		setLoading(true)
        const user_id = localStorage.getItem("user_id")
        const res =  await profile({
            user_id: user_id.toString(),
          })
		  setLoading(false)
		  console.log(res)
          if(res.status){
            setUserData(res.user)
            setUserName(res.user.name)
            setUserEmail(res.user.email)
          }
    }

    const showAlert = async() => {
        MySwal.fire({
            title: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
			cancelButtonText:"No"
          }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                title: "You have successfully logout!",
                text: "Your will be redirected to login screen",
                icon: "success"
              }).then((res) => {
                logout()
              });
            }
          });
    }

    const saveChanges = async() => {
        // setIsLoading(true);
        const id = localStorage.getItem("user_id")
        let formdata = new FormData();
        formdata.append('user_id', id);
        formdata.append('name', userName);
        formdata.append('email', userEmail);
        formdata.append('gender', "male");
        formdata.append('image', {
          // uri: image.uri,
          // type: image.type,
          // name: image.name || image.fileName,
          uri: '' ,
          // type: image.type,
          // name: image.name || image.fileName,
          type: 'image/jpeg', // or photo.type
          name: 'image.png',
        });
        const res = await profile_update(formdata)
        setIsLoading(false);
        console.log(res)
        if(res.status){
            toast.success("Profile Updated Successfully")
        }

    }

    const updateUser = async(item) => {
        const id = localStorage.getItem("user_id")
        const res =  await user_type_update({
            user_type: item,
            id: id.toString(),
          })
          console.log(res)
    }

	if(loading) {

		return <ScreenLoader/>
	}

  return (
    <>
        <Header/>
            {/* <!-- ============================ User Dashboard ================================== --> */}
			<section class="bg-light mt-40">
				<div class="container-fluid">
				
					<div class="row">
						<div class="col-lg-12 col-md-12">
							<div class="filter_search_opt">
								<a href="javascript:void(0);" onclick="openFilterSearch()" class="btn btn-dark full-width mb-4">Dashboard Navigation<i class="fa-solid fa-bars ms-2"></i></a>
							</div>
						</div>
					</div>
								
					<div class="row">
						
						<div class="col-lg-3 col-md-12 mt-4">
							
							<div class="simple-sidebar sm-sidebar" id="filter_search">
								
								<div class="search-sidebar_header">
									<h4 class="ssh_heading">Close Filter</h4>
									<button onclick="closeFilterSearch()" class="w3-bar-item w3-button w3-large"><i class="fa-regular fa-circle-xmark fs-5 text-muted-2"></i></button>
								</div>
								
								<div class="sidebar-widgets">
									<div class="dashboard-navbar">
										
										<div class="d-user-avater">
											<img src={userData?.imageUrl} class="img-fluid avater" alt=""/>
											<h4>{userData?.name}</h4>
											<span>{userData?.mobile}</span>
										</div>
										
										<div class="d-navigation">
											<ul>
												<li  class={positions == 1 && "active" } onClick={() => setPostion(1)}><a ><i class="fa-solid fa-address-card"></i>My Profile</a></li>
												<li class={positions == 2 && "active" } onClick={() => setPostion(2)}><a ><i class="fa-solid fa-gauge"></i>Manage</a></li>
												<li class={positions == 3 && "active" } onClick={() => setPostion(3)}><a ><i class="fa-solid fa-bookmark"></i>Raad Reeb</a></li>
												<li class={positions == 4 && "active" } onClick={() => setPostion(4)}><a ><i class="fa-solid fa-building-circle-check"></i>My Interest</a></li>
												{/* <li class={positions == 5 && "active" } onClick={() => setPostion(5)}><a ><i class="fa-solid fa-house"></i>Submit New Property</a></li>
												<li class={positions == 6 && "active" } onClick={() => setPostion(6)}><a ><i class="fa-solid fa-unlock"></i>Change Password</a></li> */}
												<li class={positions == 7 && "active" } onClick={() => showAlert()}><a ><i class="fa-solid fa-power-off"></i>Log Out</a></li>
											</ul>
										</div>
										
									</div>
								</div>
								
							</div>
						</div>
						
                        {positions == 1 && (
                            <div class="col-lg-9 col-md-12 mt-4">
							<div class="dashboard-wraper">
								<div class="form-submit">	
									<h4>My Account</h4>
									<div class="submit-section">
										<div class="row">
										
											<div class="form-group col-md-6">
												<label>Your Name</label>
												<input type="text" class="form-control" value={userName} onChange={e => setUserName(e.target.value)}/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Email</label>
												<input type="email" class="form-control" value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Gendar</label>
												<RadioGroup
												options={options}
												name="example"
												selectedValue={selectedOption}
												onChange={handleOptionChange}
											/>
											</div>
											
											{/* <div class="form-group col-md-6">
												<label>Your Title</label>
												<input type="text" class="form-control" value="Web Designer"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Phone</label>
												<input type="text" class="form-control" value="123 456 5847"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Address</label>
												<input type="text" class="form-control" value="522, Arizona, Canada"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>City</label>
												<input type="text" class="form-control" value="Montquebe"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>State</label>
												<input type="text" class="form-control" value="Canada"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Zip</label>
												<input type="text" class="form-control" value="160052"/>
											</div>
											
											<div class="form-group col-md-12">
												<label>About</label>
												<textarea class="form-control">Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper</textarea>
											</div> */}
											
										</div>
									</div>
								</div>
								
								<div class="form-submit">	
									{/* <h4>Social Accounts</h4> */}
									<div class="submit-section">
										<div class="row">
										
											{/* <div class="form-group col-md-6">
												<label>Facebook</label>
												<input type="text" class="form-control" value="https://facebook.com/"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Twitter</label>
												<input type="email" class="form-control" value="https://twitter.com/"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Google Plus</label>
												<input type="text" class="form-control" value="https://googleplus.com/"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>LinkedIn</label>
												<input type="text" class="form-control" value="https://linkedin.com/"/>
											</div> */}
											
											<div class="form-group col-lg-12 col-md-12">
                                            <LoaderButton title={'Save Changes'} onClick={(e) =>saveChanges(e)} isLoading={isLoading}/>
											</div>
											
										</div>
									</div>
								</div>
								
							</div>
						</div>
                        )}

                        {positions == 2 && (
                            <div class="col-lg-9 col-md-12 mt-4">
							<div class="dashboard-wraper">
								<div class="form-submit">	
									<h4>Manage</h4>
                                    <div class="row">
					
								<div onClick={() =>{
                                    // updateUser('3')
                                 navigate("/my_account/tenent", {state: 3})
                                 }} class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard-stat widget-1">
										<div class="dashboard-stat-content"><h4>Tenant</h4></div>
										<div class="dashboard-stat-icon"><i class="fa-solid fa-location-dot"></i></div>
									</div>	
								</div>
								
								<div onClick={() => {
                                    // updateUser('1')
                                    navigate("/my_account/owner", {state: "1"})
                                    }} class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard-stat widget-2">
										<div class="dashboard-stat-content"><h4>Owner/Landlord</h4></div>
										<div class="dashboard-stat-icon"><i class="ti-pie-chart"></i></div>
									</div>	
								</div>
								
								<div onClick={() => {
                                    // updateUser('4')
                                    navigate("/my_account/builder", {state:"4"})
                                    }} class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard-stat widget-3">
										<div class="dashboard-stat-content"><h4>Builder</h4></div>
										<div class="dashboard-stat-icon"><i class="ti-user"></i></div>
									</div>	
								</div>
							</div>
									
								</div>
								
								
								
							</div>
						</div>
                        )}

                        {positions == 3 && (
                           <RaadReeb/>
                        )}

                        {positions == 4 && (
                         <InterestProperties/>
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

export default MyAccount

// import React, { useEffect, useRef } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// const MyAccount = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const client = useRef(null);

//   useEffect(() => {
//     const initializeAgora = async () => {
//       const APP_ID = 'c8643875c4424354b06e237867dd8b68'; // Replace with your Agora App ID
//       const CHANNEL = 'broadcast3082496305'; // Replace with your channel name
//       const TOKEN = null; // Use null for testing. In production, use a token server


// 		url = 'https://somalease.com/admin/api/realtimebookbroadcast';

// 		fetch(url, {
// 		  method: 'Post',
// 		  headers: {
// 			accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		  },
// 		  body: JSON.stringify({
// 			// bridge_id: Global.bridge_id,
// 			// speaker_id: Global.livedataa.main_speaker_id,
// 			// user_id: Global.user.id,
// 			// price_per_mint: Global.livedataa.video_price,
// 			// broadcast_id: Global.livedataa.id,
// 			// type: '1',
// 			// user_name: Global.user.name,
// 		  }),
// 		})
// 		  .then(response => response.json())
// 		  .then(responseJson => {
// 			console.log(responseJson)
// 			// alert(JSON.stringify(responseJson, null, 2));
// 			// return;
// 			// toggleLoader(false);
// 			if (responseJson.status == true) {
// 			//   this.refRBSheet13.close();
// 			  // navigation.navigate('ConstractorOtp1', mobile);
// 			} else {
// 			//   alert(responseJson.msg);
// 			}
// 		  });
	  

//       client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

//       await client.current.join(APP_ID, CHANNEL, TOKEN, null);

//       // Create and publish the local audio and video tracks
//       const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//       const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

//       await client.current.publish([localAudioTrack, localVideoTrack]);

//       localVideoTrack.play(localVideoRef.current);

//       // Subscribe to remote users
//       client.current.on('user-published', async (user, mediaType) => {
//         await client.current.subscribe(user, mediaType);

//         if (mediaType === 'video') {
//           user.videoTrack.play(remoteVideoRef.current);
//         }
//         if (mediaType === 'audio') {
//           user.audioTrack.play();
//         }
//       });

//       return () => {
//         localAudioTrack.close();
//         localVideoTrack.close();
//         client.current.leave();
//       };
//     };

//     initializeAgora();
//   }, []);

//   return (
//     <div>
//       <h2>Agora Video Call</h2>
//       <div ref={localVideoRef} style={{ width: '320px', height: '240px' }}></div>
//       <div ref={remoteVideoRef} style={{ width: '320px', height: '240px' }}></div>
//     </div>
//   );
// };

// export default MyAccount;