import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// import './App.css'
import "./assets/css/styles.css";
import "./assets/css/colors.css";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import PropertyDetails from "./screens/PropertyDetails";
import PostProperty from "./screens/PostProperty";
import AllProperties from "./screens/AllProperties";
import MyAccount from "./screens/MyAccount";
// import PrivateRoute from './components/PrivateRoute'
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalProvider";

function App() {

  return (
    // <BrowserRouter basename="/">
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
    <AuthProvider>
      <GlobalProvider>
      <AppRoutes />
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
