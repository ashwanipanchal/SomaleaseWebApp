import React, { useEffect, useState } from "react";
import {
  age_master,
  bhk_type_master,
  facing_master,
  floor_master,
  master_building_type,
  post_properties_step1,
  property_type_master,
} from "../../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderButton from "../LoaderButton/LoaderButton";


const Step2 = ({ stepNumber, currentStep, incrementStep, prevStep, handleDataChange, passData }) => {
  console.log(passData)
  //UseState for My Field
  const [isLoading, setIsLoading] = useState(false);
  const [about, setAbout] = useState('');

  const [inputFields, setInputFields]=useState([{
    link:"",
}])

  const handleClick = async(e) => {
	e.preventDefault()
    // console.log(inputFields)
    if (about == '') {
      toast.error('Please enter about codkar');
      return;
	  }

	
	    setIsLoading(true);
        handleDataChange({...passData,about, inputFields});
        setTimeout(() =>{
            incrementStep()
        },1000)
	
  };

  const handleChange = (index, evnt) => {
    let { name, value,maxLength } = evnt.target;

    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
}

  const addMore = () => {
    setInputFields([...inputFields, {
      link:""
    }])
  }
  return (
    <div class="form-submit">
      {/* <h3>Basic Information</h3> */}
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-12">
            <label>About Codkar</label>
            <input value={about}
              onChange={(e) => setAbout(e.target.value)} type="text" class="form-control" />
          </div>
          <label>Video Link (Youtube Link)</label>
          {inputFields.map((data,index)=> (
            <div class="form-group col-md-12">
            <input name='link' value={data.link}
              onChange={(evnt) => handleChange(index, evnt)} type="text" class="form-control" />
          </div>
          ))}

        <label onClick={() => addMore()}>+ Add More</label>
          
        </div>
        <div class="form-group col-lg-12 col-md-12">
		    <LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
        </div>
      </div>
	  <ToastContainer />
    </div>
  );
};


export default Step2;
