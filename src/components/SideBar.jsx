import React from "react";
import Builder from "./AccountManageComponents/Builder";
import Owner from "./AccountManageComponents/Owner";
import Tenants from "./AccountManageComponents/Tenants";
import { useNavigate } from "react-router-dom";

const SideBar = ({state, updatePosition}) => {
    const navigate = useNavigate();

    const handleClick = (position) => {
      // Update the position or do something else if needed
      if (updatePosition) {
        updatePosition(position);
      }
  
      // Navigate back to the main account/builder screen
    // Navigate back to the main account/builder screen and pass the current position
    navigate("/my_account/builder", { state: { position, fromBack: true } });
    };
  return (
    <div class="col-lg-3 col-md-12">
      <div class="simple-sidebar sm-sidebar" id="filter_search">
        <div class="search-sidebar_header">
          <h4 class="ssh_heading">Close Filter</h4>
          <button
            onclick="closeFilterSearch()"
            class="w3-bar-item w3-button w3-large"
          >
            <i class="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
          </button>
        </div>

        <div class="sidebar-widgets">
          <div class="dashboard-navbar">
            {state == "3" ? (
              <Tenants updatePosition={handleClick} />
            ) : state == "1" ? (
              <Owner updatePosition={handleClick} />
            ) : (
              <Builder updatePosition={handleClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
