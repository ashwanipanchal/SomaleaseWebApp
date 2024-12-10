import React,{useState, useEffect, useContext} from 'react'
import { my_properties_for_owner } from '../../api/auth';
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import { GlobalContext } from '../../contexts/GlobalProvider';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
	const navigate = useNavigate()
	const { globalData, setGlobalData } = useContext(GlobalContext);
    const [listOfProperty, setListOfProperty] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getProperty();
    }, []);
  
    const getProperty = async () => {
        const user_id = localStorage.getItem("user_id");
        setLoading(true)
      const res = await my_properties_for_owner({
        user_id: user_id.toString(),
      });
      setLoading(false)
      console.log(res)
      if (res.status) {
        setListOfProperty(res.my_propertie);
      }
    };

    if(loading){
        return(
            <ScreenLoader/>
        )
    }
  return (
    <div class="dashboard-wraper">
							
								{/* <!-- Bookmark Property --> */}
								<div class="form-submit">	
									<h4>My Property</h4>
								</div>
								
								<div class="row">
								
									{/* <!-- Single Property --> */}
                                    {listOfProperty?.map((i) => (
									<div class="col-md-12 col-sm-12 col-md-12">
										<div class="singles-dashboard-list">
											<div class="sd-list-left">
												<img src={i?.propertie_image[0]?.gallery_image} class="img-fluid" alt="" />
											</div>
											<div class="sd-list-right">
												<h4 class="listing_dashboard_title"><a href="#" class="text-primary">{i?.apartment_name}</a></h4>
                                                <div class="user_dashboard_listed">
													City: <a href="" class="text-primary">{i?.locality}</a>
												</div>
												<div class="user_dashboard_listed">
													Listed As <a href="" class="text-primary">{i.property_available == 1
                                                        ? 'For Rent'
                                                        : i.property_available == 2
                                                        ? 'For Sale'
                                                        : null}</a> <a href="" class="text-primary"></a>
												</div>
												<div class="user_dashboard_listed">
													Flat: {i.flat_count+1}
												</div>
												
												<div class="action">
													<a onClick={() => {
															//   localStorage.setItem("deep_position", 3);
														navigate(`/my_account/owner/flatlist?id=${i.id}`, )
														}}  data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa-regular fa-eye"></i></a>
													{/* <a  data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-circle-xmark"></i></a> */}
													<a  onClick={() => {
															setGlobalData({user:i});
														navigate(`/my_account/owner/add_flat`, {state: i} )
														}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-plus"></i></a>
													<a onClick={() => {
														navigate(`/my_account/owner/flatlist_leads?id=${i.id}`, {state: "1"})
														}} data-bs-toggle="tooltip" data-bs-placement="top" title="Leads" class="delete"><i class="fa-solid fa-star"></i></a>
													<a  data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a>
												</div>
											</div>
										</div>
									</div>))}
								</div>
								
							</div>
  )
}

export default MyProperties