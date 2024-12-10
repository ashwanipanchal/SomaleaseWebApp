import React,{useState, useEffect} from 'react'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import {  staff_list_builder, staff_list_owner_landlord } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const MyStaffOwnerLandlord = () => {
  const navigate = useNavigate()
  const [listOfStaff, setListOfStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await staff_list_owner_landlord({
      user_id: user_id.toString(),
    });
    console.log(res)
    setLoading(false)
    if (res.status) {
      setListOfStaff(res.staff_list);
    }
  };

  if(loading){
      return(
          <ScreenLoader/>
      )
  }

  return (
    <div class="dashboard-wraper">
							
    {/* <!-- Bookmark Staff --> */}
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} class="form-submit">	
      <h4>My Staff</h4>
      <button onClick={() => navigate("/my_account/owner/add_staff")} style={{marginBottom:'20px', backgroundColor:'#DC2F2E'}}>+</button>
    </div>
    
    <div class="row">
    
      {/* <!-- Single Staff --> */}
                        {listOfStaff?.map((i) => (
      <div class="col-md-12 col-sm-12 col-md-12">
        <div style={{display:'flex', justifyContent:'space-between'}} class="singles-dashboard-list">
        <div class="sd-list-right">
            <h4 class="listing_dashboard_title"><a href="#" class="text-primary">{i?.name}</a></h4>
                                    <div class="user_dashboard_listed">
            </div>
            <div class="user_dashboard_listed">
              {i.apartment_name}
            </div>
          </div>

          <div class="sd-list-right">
            <h4 class="listing_dashboard_title"><a href="#" class="text-primary">{i?.role}</a></h4>
                                    <div class="user_dashboard_listed">
              {/* <a href="" class="text-primary">{i?.apartment_name}</a> */}
            </div>
            <div onClick={() => navigate(`/my_account/owner/staff_details/${encodeURIComponent(i.name+"+"+i.id)}`, {state:i.id})} style={{cursor:'pointer', textDecoration:'underline'}} class="user_dashboard_listed">
              View Details
            </div>
            <div style={{color: i?.status == 0 ? '#DC2F2E' : 'green'}} class="user_dashboard_listed">
              {i?.status == 0 ? 'Inactive' : 'Active'}
            </div>
            {/* <div class="user_dashboard_listed">
              Flat: {i.flat_count+1}
            </div> */}
            
            <div class="action">
              {/* <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa-regular fa-comment"></i></a> */}
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

export default MyStaffOwnerLandlord