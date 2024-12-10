import React, { useEffect, useState } from "react";
import C1 from "../assets/img/p-1.jpg";
import C2 from "../assets/img/p-2.jpg";
import C3 from "../assets/img/p-3.jpg";
import C4 from "../assets/img/p-4.jpg";
import C5 from "../assets/img/p-5.jpg";
import { user_property_interests } from "../api/auth";

const InterestProperties = () => {
  const [listOfProperty, setListOfProperty] = useState([]);

  useEffect(() => {
    getIntrestedProperties();
  }, []);

  const getIntrestedProperties = async () => {
    const user_id = localStorage.getItem("user_id");
    const res = await user_property_interests({
      user_id: user_id.toString(),
    });
    console.log(res);
    if (res.status) {
      setListOfProperty(res.rent_propertie);
    }
  };

  return (
    <div class="col-lg-9 col-md-12 mt-4">
      <div class="dashboard-wraper">
        {/* <!-- Bookmark Property --> */}
        <div class="form-submit">
          <h4>My Interest</h4>
        </div>

        <div class="row">
          {listOfProperty?.map((i) => (
            <div class="col-md-12 col-sm-12 col-md-12">
              <div class="singles-dashboard-list">
                <div class="sd-list-left">
                  <img
                    src={i?.propertie_image[0]?.gallery_image}
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="sd-list-right">
                  <h4 class="listing_dashboard_title">
                    <a href="#" class="text-primary">
                      {i?.propertie_details?.apartment_name}
                    </a>
                  </h4>
                  <div class="user_dashboard_listed">
                    Location: {i?.propertie_details?.locality}
                  </div>
                  {/* <div class="user_dashboard_listed">
                                                    Listed in <a href="javascript:void(0);" class="text-primary">Rentals</a> and <a href="javascript:void(0);" class="text-primary">Apartments</a>
                                                </div> */}
                  <div class="user_dashboard_listed">
                    {i?.propertie_details?.property_available == 1
                      ? "Rent"
                      : "Price"}
                    : {i?.propertie_details?.currency}{" "}
                    <a class="text-primary">
                      {i?.propertie_details?.property_available == 1
                        ? i?.propertie_details?.expected_rent
                        : i?.propertie_details?.selling_price}
                    </a>
                  </div>
                  {/* <div class="action">
                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a>
                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="202 User View"><i class="fa-regular fa-eye"></i></a>
                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Property" class="delete"><i class="fa-regular fa-circle-xmark"></i></a>
                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Make Featured" class="delete"><i class="fa-solid fa-star"></i></a>
                                                </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestProperties;
