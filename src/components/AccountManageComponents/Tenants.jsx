import React from 'react'

const Tenants = ({updatePosition}) => {
  return (
    <div class="d-navigation">
        <ul>
            <li onClick={() => updatePosition(1)}><a ><i class="fa-solid fa-address-card"></i>Apartment Details</a></li>
            <li onClick={() => updatePosition(2)}><a ><i class="fa-solid fa-gauge"></i>My Documents</a></li>
            <li onClick={() => updatePosition(3)}><a ><i class="fa-solid fa-bookmark"></i>My Payments</a></li>
            <li onClick={() => updatePosition(4)}><a ><i class="fa-solid fa-building-circle-check"></i>Support Request</a></li>
            <li onClick={() => updatePosition(5)}><a ><i class="fa-solid fa-power-off"></i>Connect Landlord</a></li>
            <li onClick={() => updatePosition(6)}><a ><i class="fa-solid fa-power-off"></i>My Calender</a></li>
        </ul>
    </div>
  )
}

export default Tenants