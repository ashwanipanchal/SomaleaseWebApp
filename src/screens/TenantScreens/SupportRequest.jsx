import React,{useState, useEffect} from 'react'
import ScreenLoader from '../../components/LoaderButton/ScreenLoader';
import {  my_landlord, staff_list_builder, support_ticket_list_tenant } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const SupportRequest = () => {
  const navigate = useNavigate()
  const [listOfAprt, setListOfAprt] = useState([]);
  const [listOfStaff, setListOfStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
      const user_id = localStorage.getItem("user_id");
      setLoading(true)
    const res = await my_landlord({
      user_id: user_id.toString(),
    });
    if (res.status) {
      setListOfAprt(res.data)
      getTicketList(res?.data[0]?.property_id)
    }
  };
  const getTicketList = async (prop_id) => {
      const user_id = localStorage.getItem("user_id");
      // setLoading(true)
    const res = await support_ticket_list_tenant({
      user_id: user_id.toString(),
      property_id: prop_id,
    });
    setLoading(false)
    if (res.status) {
      setListOfStaff(res.get);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        class="form-submit"
      >
        <h4>Support Request</h4>
        <button
          onClick={() => navigate("/my_account/tenant/create_ticket",{state:listOfAprt})}
          style={{ marginBottom: "20px", backgroundColor: "#DC2F2E" }}
        >
          +
        </button>
      </div>

      <div class="row">
        {/* <!-- Single Staff --> */}
        {listOfStaff?.map((i) => (
          <div class="col-md-12 col-sm-12 col-md-12">
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              class="singles-dashboard-list"
            >
              <div class="sd-list-right">
                <div class="user_dashboard_listed">{i.bridgeid}</div>
                <h4 class="listing_dashboard_title">
                  <a class="text-primary">
                    {i?.title}
                  </a>
                </h4>
                <div class="user_dashboard_listed">
                  {moment(i.created_at).format('ddd, d MMM YY')} at{' '}
                  {moment(i.created_at).format('hh:mm a')}</div>
              </div>

              <div class="sd-list-right">
                <h4 class="listing_dashboard_title">
                  <a class="text-primary">
                    {i?.role}
                  </a>
                </h4>
                <div class="user_dashboard_listed">
                  {/* <a href="" class="text-primary">{i?.apartment_name}</a> */}
                </div>
                <div
                  style={{ color: i?.status == 0 ? "#DC2F2E" : "green" }}
                  class="user_dashboard_listed"
                >
                  {
                      i.status == 0
                        ? 'Pending'
                        : i.status == 3
                        ? 'Open'
                        : i.status == 4
                        ? 'Reject'
                        : 'Completed'
                    }
                </div>
                <div onClick={() =>navigate("/my_account/tenent/ticket_details", {state:i})} style={{cursor:'pointer', textDecoration:"underline"}} class="user_dashboard_listed">View Details</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportRequest