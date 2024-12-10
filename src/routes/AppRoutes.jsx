// routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/Home';
import Login from '../screens/Login';
import PropertyDetails from '../screens/PropertyDetails';
import PostProperty from '../screens/PostProperty';
import AllProperties from '../screens/AllProperties';
import MyAccount from '../screens/MyAccount';

import useAuth from '../hooks/useAuth';
import ErrorScreen from '../screens/ErrorScreen';
import AboutUs from '../screens/AboutUs';
import MyAccountManage from '../screens/MyAccountManage';
import FlatList from '../screens/FlatList';
import AddStaff from '../screens/BuilderScreen/AddStaff';
import AddFlat from '../screens/AddFlat';
import ApartmentDetails from '../screens/TenantScreens/ApartmentDetails';
import CreateTicketTenant from '../screens/TenantScreens/CreateTicketTenant';
import TicketDetailsTenant from '../screens/TenantScreens/TicketDetailsTenant';
import AddStaffbuilder from '../screens/BuilderScreen/AddStaffBuilder';
import StaffDetails from '../screens/StaffDetails';
import SupportTicketsDetails from '../screens/SupportTicketsDetails';
import TicketRequestDetails from '../screens/TicketRequestDetails';
import TenantChat from '../screens/TenantScreens/TenantChat';
import OwnerChat from '../screens/OwnerScreen/OwnerChat';
import BuilderChat from '../screens/BuilderScreen/BuilderChat';
import LeadsDetails from '../screens/LeadsDetails';
import LeadChat from '../screens/LeadChat';
import AddBuilderEvent from '../screens/BuilderScreen/AddBuilderEvent';
import Services from '../screens/Services';
import TenantDetails from '../screens/BuilderScreen/TenantDetails';
import DonationList from '../screens/DonationList';
import DonationDetails from '../screens/DonationDetails';

const PrivateRoute = ({ children }) => {
  // console.log(props)
  const { user, loading } = useAuth();
  // console.log(user)
  if (loading) return <div>Loading...</div>;
  
  return user ? children : <Navigate to="/login" />;
  // return user ? children : children
};

const AppRoutes = () => {
  return (

    //     <BrowserRouter basename="/">
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     {/* <Route path="/" element={<Home />} /> */}
    //     <Route path="/" element={<PrivateRoute Component={Home} />} />
    //     <Route path="/property_details" element={<PropertyDetails />} />
    //     <Route path="/post_property" element={<PostProperty />} />
    //     <Route path="/all_properties" element={<AllProperties />} />
    //     <Route path="/my_account" element={<MyAccount />} />
    //   </Routes>
    // </BrowserRouter>

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <Home />
            //  </PrivateRoute>
          }
        />
        <Route
          path="/property_details/:user_id/:id"
          element={
            // <PrivateRoute>
              <PropertyDetails />
            // </PrivateRoute>
          }
        />
        <Route
          path="/post_property"
          element={
            <PrivateRoute>
              <PostProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/all_properties/:type"
          element={
            // <PrivateRoute>
              <AllProperties />
            // </PrivateRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
             </PrivateRoute>
          }
        />
        <Route
          path="/my_account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value"
          element={
            <PrivateRoute>
              <MyAccountManage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/:option"
          element={
            <PrivateRoute>
              <FlatList/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/apartment_details"
          element={
            <PrivateRoute>
              <ApartmentDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/tenant_details"
          element={
            <PrivateRoute>
              <TenantDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/add_flat"
          element={
            <PrivateRoute>
              <AddFlat/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/:flatlist_leads"
          element={
            <PrivateRoute>
              <FlatList/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/builder/:flatlist_leads/:lead_details"
          element={
            <PrivateRoute>
              <LeadsDetails/>
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/my_account/:value/:option"
          element={
            <PrivateRoute>
              <FlatList/>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/my_account/:value/add_staff"
          element={
            <PrivateRoute>
              <AddStaff/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/add_staff_builder"
          element={
            <PrivateRoute>
              <AddStaffbuilder/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/add_builder_events"
          element={
            <PrivateRoute>
              <AddBuilderEvent/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/create_ticket"
          element={
            <PrivateRoute>
              <CreateTicketTenant/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/ticket_details"
          element={
            <PrivateRoute>
              <TicketDetailsTenant/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/staff_details/:name"
          element={
            <PrivateRoute>
              <StaffDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/support_ticket/:name"
          element={
            <PrivateRoute>
              <SupportTicketsDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:value/support_ticket/:name/ticket_details/:ids"
          element={
            <PrivateRoute>
              <TicketRequestDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/tenant/connect_with_landlord"
          element={
            <PrivateRoute>
              <TenantChat/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/owner/connect_my_tenant"
          element={
            <PrivateRoute>
              <OwnerChat/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/builder/connect_my_buyer"
          element={
            <PrivateRoute>
              <BuilderChat/>
            </PrivateRoute>
          }
        />
        <Route
          path="/my_account/:any/flatlist_leads/lead_details/connect_with_lead"
          element={
            <PrivateRoute>
              <LeadChat/>
            </PrivateRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <ErrorScreen />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/my_account/builder/flatlist_leads"
          element={
            <PrivateRoute>
              <ErrorScreen />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/about_us"
          element={
              <AboutUs />
          }
        />
        <Route
          path="/about_us"
          element={
              <AboutUs />
          }
        />
        <Route
          path="/donation_list"
          element={
            <PrivateRoute>
              <DonationList />
            </PrivateRoute>
          }
        />
        <Route
          path="/donation_list/donation_details/:id"
          element={
            <PrivateRoute>
              <DonationDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
