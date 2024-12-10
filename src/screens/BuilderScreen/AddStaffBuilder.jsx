import React, { useState, useEffect } from "react";
import {  add_staff_builder, my_properties_builder, staff_responsibility_master, staff_role_master } from "../../api/auth";
import ScreenLoader from "../../components/LoaderButton/ScreenLoader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { ToastContainer , toast} from "react-toastify";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import MultiSelect from "../../components/MultipleSelectDropdown/MultiSelect";

const AddStaffbuilder = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");

  const MySwal = withReactContent(Swal);

  const [listOfProperty, setListOfProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  //useState for Master Data
  const [roleMaster, setRoleMaster] = useState([]);
  const [resposibilityMaster, setResponsibilityMaster] = useState([]);
  const [buildingMaster, setBuildingMaster] = useState([]);

  //UseState for My Field
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState("");
  const [Res, setRes] = useState([]);
  const [building, setBuilding] = useState("");
  const [name, setname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    getstaff();
    getrole();
    getBuilding();
  }, []);

  const getstaff = async () => {
    setLoading(true);
    const res = await staff_responsibility_master();
    setLoading(false);
    if (res.status) {
        setResponsibilityMaster(res.data)
    }
  };

  const getrole = async () => {
    setLoading(true);
    const res = await staff_role_master();
    setLoading(false);
    if (res.status) {
        setRoleMaster(res.data)
    }
  };

  const getBuilding = async () => {
    const ids = localStorage.getItem("user_id")
    setLoading(true);
    const res = await my_properties_builder({
        user_id: ids.toString(),
      });
    setLoading(false);
    if (res.status) {
        setBuildingMaster(res.my_propertie)
    }
  };

  
  const handleClick = async(e) => {
	e.preventDefault()
    
	if (name == '') {
		toast.error('Please enter name');
		return;
	  }
	  if (mobile == '') {
		toast.error('Please enter mobile');
		return;
	  }
	  if (email == '') {
		toast.error('Please enter email');
		return;
	  }
	  if (role == '') {
		toast.error('Please select role');
		return;
	  }
	  if (Res == '') {
		toast.error('Please select responsibilties');
		return;
	  }
	  if (building == '') {
		toast.error('Please select building');
		return;
	  }
	 
	
	setIsLoading(true);

	const id = await localStorage.getItem("user_id")
	let formdata = new FormData();
  formdata.append('user_id', id);
  formdata.append('name', name);
  formdata.append('mobile', mobile);
  formdata.append('email_id', email);
  formdata.append('role', role);
  formdata.append('responsibility', Res);
  formdata.append('apartment_id', building);
  formdata.append('staff_for', '2');

	const res = await add_staff_builder(formdata)
	setIsLoading(false);
	console.log(res)
	if(res.status){
    showAlert()
	}

  };


  const showAlert = async() => {
    MySwal.fire({
      title: "Staff added successfully",
      icon: "success",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      // showDenyButton: true,
      // denyButtonText: "View Property"
      }).then((result) => {
      if (result.isConfirmed) {
        setname("")
        setMobile("")
        setEmail("")
        setRole("")
        setRes("")
        setBuilding("")
        }
      });
  }

  const handleChange = (event) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(values)
    setRes(values);
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
                  <h3>Add Staff Builder</h3>
                  <div class="submit-section">
                    <div class="row">

                    <div class="form-group col-md-6">
                        <label>
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          class="form-control"
                        />
                      </div>

                    <div class="form-group col-md-6">
                        <label>
                          Mobile No.
                        </label>
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          class="form-control"
                        />
                      </div>

                    <div class="form-group col-md-6">
                        <label>
                          Email
                        </label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label>Role</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          id="status"
                          class="form-control"
                        >
                           <option value="">Select</option>
                          {roleMaster?.map((i) => (
                            <option value={i.name}>{i.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* <div class="form-group col-md-6">
                        <label>Responsibilties</label>
                        <select
                          multiple
                          value={Res}
                          onChange={(e) => setRes(e.target.value)}
                          id="status"
                          class="form-control"
                        >
                           <option value="">Select</option>
                          {resposibilityMaster?.map((i) => (
                            <option value={i.name}>{i.name}</option>
                          ))}
                        </select>
                      </div> */}
                      <MultiSelect values={resposibilityMaster} value={role} onhandleChange={handleChange}/>
                      {/* <p>Selected options: {role.join(', ')}</p> */}

                      <div class="form-group col-md-6">
                        <label>Select Apartment/Building</label>
                        <select
                          value={building}
                          onChange={(e) => setBuilding(e.target.value)}
                          id="status"
                          class="form-control"
                        >
                           <option value="">Select</option>
                          {buildingMaster?.map((i) => (
                            <option value={i.apartment_name}>{i.apartment_name}</option>
                          ))}
                        </select>
                      </div>


                    </div>
                    <div class="form-group col-lg-12 col-md-12">
                      <LoaderButton
                        title={"Add"}
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

export default AddStaffbuilder;
