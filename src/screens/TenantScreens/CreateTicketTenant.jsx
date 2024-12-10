import React, { useState, useEffect } from "react";
import {  add_document, add_staff_builder, create_support_ticket_tenant, fileUploadMultiple, my_properties_builder, staff_responsibility_master, staff_role_master } from "../../api/auth";
import ScreenLoader from "../../components/LoaderButton/ScreenLoader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { ToastContainer , toast} from "react-toastify";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import MultiSelect from "../../components/MultipleSelectDropdown/MultiSelect";

const CreateTicketTenant = () => {
  const { state } = useLocation();
  console.log(state)

  const MySwal = withReactContent(Swal);

  const [listOfProperty, setListOfProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  //useState for Master Data
  const [roleMaster, setRoleMaster] = useState([]);
  const [resposibilityMaster, setResponsibilityMaster] = useState([]);
  const [buildingMaster, setBuildingMaster] = useState([]);

  //UseState for My Field
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");

  const [selectedObject, setSelectedObject] = useState({});
  const [role, setRole] = useState("");
  const [Res, setRes] = useState([]);
  const [building, setBuilding] = useState("");
  const [name, setname] = useState("");
  const [mobile, setMobile] = useState("");
  const [apartment_no, setApartmentNo] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tenentID, setTenentID] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleClick = async(e) => {
	e.preventDefault()
    
	if (role == "") {
    toast.error("Please select apartment");
    return;
  }
  if (name == "") {
    toast.error("Please enter name");
    return;
  }
  if (mobile == "") {
    toast.error("Please enter mobile no");
    return;
  }
  if (apartment_no == "") {
    toast.error("Please enter house no");
    return;
  }
  if (address == "") {
    toast.error("Please enter address");
    return;
  }
  if (title == "") {
    toast.error("Please enter title");
    return;
  }
  if (description == "") {
    toast.error("Please enter description");
    return;
  }
  if (description == "") {
    toast.error("Please enter description");
    return;
  }
  if (!file) {
    toast.error("Please attach your file");
    return;
  }
	 
	
	setIsLoading(true);

	const id = await localStorage.getItem("user_id")

	const res = await create_support_ticket_tenant({
    tenant_id: tenentID,
    property_id: selectedRole.toString(),
    user_id: id,
    name: name,
    mobile: mobile,
    house_address: apartment_no,
    address: address,
    title: title,
    description: description,
    photos: file,
  })
	setIsLoading(false);
	console.log(res)
	if(res.status){
    showAlert()
	}

  };


  const showAlert = async() => {
    MySwal.fire({
      title: "Ticket created successfully",
      icon: "success",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      // showDenyButton: true,
      // denyButtonText: "View Property"
      }).then((result) => {
      if (result.isConfirmed) {
        setRole("")
        setname("")
        setMobile("")
        setApartmentNo("")
        setAddress("")
        setTitle("")
        setDescription("")
        }
      });
  }

    // Handle the change event for the select input
    const handleChange = (event) => {
      const selected = state.find(
        (option) => option.apartment_name === event.target.value
      );
      
    setTenentID(selected.id);
    setSelectedRole(selected.property_id);
    setSelectedObject(selected);
    setRole(selected.apartment_name);

    // if (selectedObject) {
      console.log("f")
      console.log(selected)
      setname(selected.user_name);
      setMobile(selected.user_number);
      setApartmentNo(selected.apartment_no);
      setAddress(selected.locality);
    // }

  };


  const uploadImage = async (files) => {
    // const imageFiles = [];
    // const pdfFiles = [];
    // // Separate files based on type
    // Array.from(files).forEach((file) => {
    //   if (file.type.startsWith("image/")) {
      //     imageFiles.push(file);
      //   } else if (file.type.startsWith("application/pdf")) {
        //     pdfFiles.push(file);
        //   }
        // });
        
        // imageFiles.forEach((image, index) => {
          //   formData.append(`uploadfile[]`, image);
          // });
          
          // // Append videos to FormData
          // pdfFiles.forEach((pdf, index) => {
    //   formData.append(`uploadfile[]`, pdf);
    // });
    let formData = new FormData();
    const id = await localStorage.getItem("user_id")
    formData.append('user_id', id);
    formData.append('image', files);
    const res = await add_document(formData)
    console.log(res)
    if(res.status){
      setFile(res.filepath)
      toast.success("File uploaded successfully.")
    }

  };

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <Header />

      <section className="bg-light mt-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="submit-page basic-form">
                <div class="form-submit">
                  <h3>Create New Ticket</h3>
                  <div class="submit-section">
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label>Property</label>
                        <select
                          value={role}
                          onChange={handleChange}
                          // setRole(e.target.value)
                          id="status"
                          class="form-control"
                        >
                          <option value="">Select</option>
                          {state?.map((i) => (
                            <option value={i.apartment_name}>{i.apartment_name}</option>
                          ))}
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label>Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label>Mobile No.</label>
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label>HouseNo/Apartment</label>
                        <input
                          type="text"
                          value={apartment_no}
                          onChange={(e) => setApartmentNo(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label>Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-12">
                        <label>Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          class="form-control h-120"
                        ></textarea>
                      </div>

                      <div class="form-group col-md-12">
                        <label>Upload File{" "}</label>
                        <input
                          type="file"
                          // multiple
                          accept=".pdf,image/*"
                          onChange={(e) => uploadImage(e.target.files[0])}
                        />
                      </div>

                    </div>
                    <div class="form-group col-lg-12 col-md-12">
                      <LoaderButton
                        title={"Create"}
                        onClick={(e) => handleClick(e)}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CreateTicketTenant;
