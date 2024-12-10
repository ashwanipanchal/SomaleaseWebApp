import React ,{useState, useEffect}from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import ScreenLoader from '../components/LoaderButton/ScreenLoader'
import { donationlist } from '../api/auth'
import moment from 'moment'
import Dollar from "../assets/img/funding.png"
import Duration from "../assets/img/duration.png"

function DonationList() {
    const navigate = useNavigate()
    const [listOfProperty, setListOfProperty] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProperty();
      }, []);
    
      const getProperty = async () => {
        setLoading(true);
        const res = await donationlist();
        setLoading(false);
        if (res.status) {
          setListOfProperty(res.data);
        }
      };
    
      if (loading) {
        return <ScreenLoader />;
      }

  return (
    <div>
        <Header/>
        <section class="gray-simple">
        <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-5">
              <h3>Donation List</h3>
                <>
                  <div class="row g-4">
                    {listOfProperty?.map((i, index) => (
                      <div class="col-lg-4 col-md-12">
                        <div class="dashboard-wraper">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-md-12">
                              <div class="singles-dashboard-list mb-0">
                                <div style={{alignContent:"center", marginLeft:"20px"}} class="sd-list-left">
                                  <img
                                    style={{height:"80%", width:"90%"}}
                                    src={i?.image}
                                    class="img-fluid"
                                    alt=""
                                  />
                                </div>
                                <div class="sd-list-right">
                                  <h4 style={{cursor:"pointer"}} onClick={() => navigate(`donation_details/${i?.id}`,{state:i?.id})} class="listing_dashboard_title">
                                    <a  class="text-primary">
                                      {i?.project_name}
                                    </a>
                                  </h4>

                                  <div style={{display:"flex"}}>
                                        <img style={{height:"14%", width:"14%", marginRight:"10px"}} src={Duration}/>
                                        <div class="user_dashboard_listed">
                                        {moment(i.end_date).diff(moment(), 'days')} Days
                                        </div>
                                    </div>

                                  <div style={{display:"flex", marginTop:"10px"}}>
                                        <img style={{height:"14%", width:"14%", marginRight:"10px"}} src={Dollar}/>
                                        <div class="user_dashboard_listed">
                                        ${i.total_funding}
                                        </div>
                                    </div>

                                  <div class="user_dashboard_listed">
                                    <progress style={{width:"110%", marginTop:"8px"}} value={parseFloat(
                                        parseFloat(i.till_funding) /
                                            parseFloat(i.total_funding),
                                        )} />
                                  </div>                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
            </div>
          </div>
          </div>
          </section>
        <Footer/>
    </div>
  )
}

export default DonationList