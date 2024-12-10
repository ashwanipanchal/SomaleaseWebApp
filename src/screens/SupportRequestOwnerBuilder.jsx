import React,{useState, useEffect} from 'react'
import ScreenLoader from '../components/LoaderButton/ScreenLoader';
import { owner_support_list } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const SupportRequestOwnerBuilder = () => {
  const navigate = useNavigate()
  const [listOfLandlord, setListOfLandlord] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLandlord();
  }, []);

  const getLandlord = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await owner_support_list({
      owner_id: user_id.toString(),
    });
    setLoading(false)
    console.log(res)
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
            <img src={i?.user_image} class="img-fluid" alt="" />
          </div>
          <div class="sd-list-right">
            <h4 class="listing_dashboard_title"><a class="text-primary">{i?.name}</a></h4>
                                    <div class="user_dashboard_listed">
              {/* <a href="" class="text-primary">{i?.apartment_name}</a> */}
            </div>
            <div class="user_dashboard_listed">
              {i.apartment_name} - {i.floor} - {i.bhk_type}
            </div>
            {/* <div class="user_dashboard_listed">
              Flat: {i.flat_count+1}
            </div> */}
            
            <div class="action">
              <a onClick={() => navigate(`support_ticket/${i.name}`, {state:i.property_id})} data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa-regular fa-comment"></i></a>
              {/* <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-circle-xmark"></i></a> */}
              {/* <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Flat" class="delete"><i class="fa-regular fa-plus"></i></a>
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Leads" class="delete"><i class="fa-solid fa-star"></i></a>
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a> */}
            </div>
          </div>
        </div>
      </div>))}
    </div>
    
  </div>
  )
}

export default SupportRequestOwnerBuilder