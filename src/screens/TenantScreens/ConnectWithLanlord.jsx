import React,{useState, useEffect, useContext} from 'react'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import {  my_landlord } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalProvider';

const ConnectWithLandlord = () => {
  const navigate = useNavigate()
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [listOfLandlord, setListOfLandlord] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLandlord();
  }, []);

  const getLandlord = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await my_landlord({
      user_id: user_id.toString(),
    });
    // console.log(res)
    setLoading(false)
    if (res.status) {
      setListOfLandlord(res.data);
    }
  };

  if(loading){
      return(
          <ScreenLoader/>
      )
  }

  return (
    <div class="dashboard-wraper">
							
    {/* <!-- Bookmark Landlord --> */}
    <div class="form-submit">	
      <h4>Connect With Landlord</h4>
    </div>
    
    <div class="row">
    
      {/* <!-- Single Landlord --> */}
                        {listOfLandlord?.map((i) => (
      <div class="col-md-12 col-sm-12 col-md-12">
        <div class="singles-dashboard-list">
          <div class="sd-list-left">
            <img src={i?.property_owner_image} class="img-fluid" alt="" />
          </div>
          <div class="sd-list-right">
            <h4 class="listing_dashboard_title"><a class="text-primary">{i?.property_owner_name}</a></h4>
                                    <div class="user_dashboard_listed">
              <a  class="text-primary">{i?.apartment_name}</a>
            </div>
            <div class="user_dashboard_listed">
              {i.floor} - {i.bhk_type} - {i.apartment_no}
            </div>
            {/* <div class="user_dashboard_listed">
              Flat: {i.flat_count+1}
            </div> */}
            
            <div class="action">
              <a onClick={() => {
                navigate("/my_account/tenant/connect_with_landlord",{state: i})
                // setGlobalData({ ...globalData, bridge_id:});
                }} data-bs-toggle="tooltip" data-bs-placement="top" title="Chat" style={{cursor:"pointer"}}><i class="fa-regular fa-comment"></i></a>
              {/* <a data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-circle-xmark"></i></a> */}
              {/* <a data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-plus"></i></a>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Leads" class="delete"><i class="fa-solid fa-star"></i></a>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a> */}
            </div>
          </div>
        </div>
      </div>))}
    </div>
    
  </div>
  )
}

export default ConnectWithLandlord