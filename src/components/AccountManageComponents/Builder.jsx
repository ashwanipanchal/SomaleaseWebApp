import React from 'react'

const Builder = ({updatePosition}) => {
  return (
    <div class="d-navigation">
        <ul>
            <li onClick={() => updatePosition(1)}><a ><i class="fa-solid fa-address-card"></i>My Buyers</a></li>
            <li onClick={() => updatePosition(2)}><a ><i class="fa-solid fa-gauge"></i>My Codkar</a></li>
            <li onClick={() => updatePosition(3)}><a ><i class="fa-solid fa-bookmark"></i>My Properties</a></li>
            <li onClick={() => updatePosition(4)}><a ><i class="fa-solid fa-bookmark"></i>My Staff</a></li>
            <li onClick={() => updatePosition(5)}><a ><i class="fa-solid fa-building-circle-check"></i>Notification</a></li>
            <li onClick={() => updatePosition(6)}><a ><i class="fa-solid fa-power-off"></i>Documents</a></li>
            <li onClick={() => updatePosition(7)}><a ><i class="fa-solid fa-power-off"></i>Support Request</a></li>
            <li onClick={() => updatePosition(8)}><a ><i class="fa-solid fa-power-off"></i>My Calender</a></li>
        </ul>
    </div>
  )
}

export default Builder