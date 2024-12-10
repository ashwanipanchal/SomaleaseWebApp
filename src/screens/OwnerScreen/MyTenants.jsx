import React,{useState, useEffect} from 'react'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import {  tenant_side_documents } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const MyTenants = () => {
  const navigate = useNavigate()
  const [listOfProperty, setListOfProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await tenant_side_documents({
      user_id: user_id.toString(),
    });
    setLoading(false)
    console.log(res)
    if (res.status) {
      setListOfProperty(res.data);
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
      <h4>My Tenants</h4>
    </div>
    
    <div class="row">
    
      {/* <!-- Single Property --> */}
                        {listOfProperty?.map((i) => (
      <div class="col-md-12 col-sm-12 col-md-12">
        <div class="singles-dashboard-list">
          <div class="sd-list-left">
            <img src={i?.user_image} class="img-fluid" alt="" />
          </div>
          <div class="sd-list-right">
            <h4 onClick={() => navigate("tenant_details",{state:i})} class="listing_dashboard_title">
              <a style={{cursor:"pointer"}} class="text-primary">{i?.user_name}</a></h4>
                <div class="user_dashboard_listed">
              <a class="text-primary">{i?.apartment_name}</a>
            </div>
            <div class="user_dashboard_listed">
              {i.floor} - {i.bhk_type} - {i.apartment_no}
            </div>
            {/* <div class="user_dashboard_listed">
              Flat: {i.flat_count+1}
            </div> */}
            
            <div class="action">
              <a onClick={() => {
                navigate("/my_account/owner/connect_my_tenant",{state: i})
                // setGlobalData({ ...globalData, bridge_id:});
                }} data-bs-toggle="tooltip" data-bs-placement="top" style={{cursor:"pointer"}} title="Chat"><i class="fa-regular fa-comment"></i></a>
              {/* <a  data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-circle-xmark"></i></a> */}
              {/* <a  data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-plus"></i></a>
              <a  data-bs-toggle="tooltip" data-bs-placement="top" title="Leads" class="delete"><i class="fa-solid fa-star"></i></a>
              <a  data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a> */}
            </div>
          </div>
        </div>
      </div>))}
    </div>
    
  </div>
  )
}

export default MyTenants