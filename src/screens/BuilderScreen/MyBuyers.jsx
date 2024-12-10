import React,{useState, useEffect} from 'react'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import { landlord_side_documents } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const MyBuyers = () => {
  const navigate = useNavigate()
  const [listOfProperty, setListOfProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await landlord_side_documents({
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
      <h4>My Buyers</h4>
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
            <h4 class="listing_dashboard_title"><a style={{cursor:"pointer"}} class="text-primary">{i?.user_name}</a></h4>
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
                navigate("/my_account/builder/connect_my_buyer",{state: i})
                // setGlobalData({ ...globalData, bridge_id:});
                }}data-bs-toggle="tooltip" data-bs-placement="top" title="Chat" style={{cursor:"pointer"}}><i class="fa-regular fa-comment"></i></a>
              {/* <a style={{cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-circle-xmark"></i></a> */}
              {/* <a style={{cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-plus"></i></a>
              <a style={{cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Leads" class="delete"><i class="fa-solid fa-star"></i></a>
              <a style={{cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a> */}
            </div>
          </div>
        </div>
      </div>))}
    </div>
    
  </div>
  )
}

export default MyBuyers