import React, { useState, useEffect, useContext } from "react";
import LoaderButton from "../LoaderButton/LoaderButton";
import { toast, ToastContainer } from "react-toastify";
import { master_amenities, post_properties_step4 } from "../../api/auth";
import { GlobalContext } from "../../contexts/GlobalProvider";

const Step4 = ({
  stepNumber,
  currentStep,
  incrementStep,
  prevStep,
  passData,
  handleDataChange,
}) => {

  const { globalData, setGlobalData } = useContext(GlobalContext);
  console.log(globalData)

  const [bathroom, setBathroom] = useState('');
  const [balcony, setBalcony] = useState('');
  const [beds, setBeds] = useState('');
  const [nonveg, setNonveg] = useState("");
  const [gated, setGated] = useState("");
  const [gym, setGym] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  //Masters
  const [allAmenties, setAllAmenties] = useState([]);



  useEffect(() => {
    getAllAmenties();
  }, []);

  useEffect(() => {
    setBathroom(globalData?.user?.bathrooms)
    setBalcony(globalData?.user?.balconys)
    setBeds(globalData?.user?.beds)
    setNonveg(globalData?.user?.non_veg.toString())
    setGated(globalData?.user?.gated_security.toString())
    setGym(globalData?.user?.gym.toString())
  },[])


  const getAllAmenties = async () => {
    const res = await master_amenities();
    if (res.status) {

      const transformedData = transformAmenitiesData(res.data, globalData?.user?.other_amenities);

      // console.log(transformedData)
      // let temp = res.data?.map((i) => {
      //   return {name: i.name, id: i.id, checked:false};
      // });

      setAllAmenties(transformedData);
    }
  };

  const transformAmenitiesData = (originalData, otherAmenities) => {
    // Convert otherAmenities string to an array of numbers
    const checkedIds = otherAmenities.split(',').map(id => parseInt(id.trim(), 10));
  
    return originalData.map(item => ({
      name: item.name,
      id: item.id,
      checked: checkedIds.includes(item.id)
    }));
  };

  const handleButtonClick = () => {
    incrementStep();
  };

  const handleBackClick = () => {
    prevStep();
  };

  const handleClick = async(e) => {
    e.preventDefault()
      
    console.log(nonveg)
    if (bathroom == '') {
      toast.error('Please enter numbers of bathroom');
      return;
      }
  
      if (balcony == '') {
      toast.error('Please enter numbers of balcony');
      return;
      }
   
      if (beds == '') {
      toast.error('Please enter numbers of beds');
      return;
    }
    
    if (nonveg == '') {
      toast.error('Please select if non veg allowed');
      return;
    }
  
    if (gated == '') {
      toast.error('Please select if there is security gate');
      return;
    }
    if (gym == '') {
      toast.error('Please select if there is gym facility');
      return;
    }
    
    // setIsLoading(true);
    
    const getCheckedIds = () => {
      const checkedIds = allAmenties
        .filter((checkbox) => checkbox.checked) // Filter the checked items
        .map((checkbox) => checkbox.id); // Get the ids of checked items
      console.log('Checked IDs:', checkedIds);
      return checkedIds;
    };
    // getCheckedIds()
    // console.log(getCheckedIds())
    // return
    let formdata = new FormData();
    formdata.append('id', globalData?.Updated_Res_Data?.id);
    formdata.append('bathrooms', bathroom);
    formdata.append('balconys', balcony);
    formdata.append('beds', beds);
    formdata.append('non_veg', nonveg == 0 ? 0 : 1);
    formdata.append('gated_security', gated == 0 ? 0 : 1);
    formdata.append('gym', gym == 0 ? 0 : 1);
    formdata.append('other_amenities', getCheckedIds());

    const res = await post_properties_step4(formdata)
    setIsLoading(false);
    console.log(res)
    if(res.status){
      // handleDataChange(res);
      setGlobalData({ ...globalData,  Updated_Res_Data: res.data, Add_Flat_ID: res.data.id, });
      incrementStep()
    }
  
    };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setAllAmenties((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };

  return (
    <div class="form-submit">
      <h3>Detailed Information</h3>
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-4">
            <label>Bathroom(s)</label>
            <input value={bathroom} onChange={e => setBathroom(e.target.value)}  type="text" class="form-control" />
          </div>

          <div class="form-group col-md-4">
            <label>Balcony(s)</label>
            <input value={balcony} onChange={e => setBalcony(e.target.value)}  type="text" class="form-control" />
          </div>

          <div class="form-group col-md-4">
            <label>Beds(s)</label>
            <input value={beds} onChange={e => setBeds(e.target.value)}  type="text" class="form-control" />
          </div>

          <div class="form-group col-md-4">
            <label>Non-Veg allowed</label>
            <select value={nonveg} onChange={(e) => setNonveg(e.target.value)} id="status" class="form-control">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div class="form-group col-md-4">
            <label>Gated Security</label>
            <select value={gated} onChange={(e) => setGated(e.target.value)} id="status" class="form-control">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div class="form-group col-md-4">
            <label>Gym</label>
            <select value={gym} onChange={(e) => setGym(e.target.value)} id="status" class="form-control">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div class="form-group col-md-12">
            <label>Other Features (optional)</label>
            <div class="o-features">
              <ul class="no-ul-list third-row">
                {allAmenties.map((checkbox, index) => (
                  <li>
                    {/* <input
                      id={`a-${index + 1}`}
                      // name={`a-${index + 1}`}
                      class="form-check-input"
                      type="checkbox"
                      value={item.id}
                      checked={selectedIds.includes(item.id)}
                      onChange={(event) => { handleCheckboxChange(event) }}
                    /> */}
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id={`checkbox-${checkbox.id}`}
                      checked={checkbox.checked}
                      onChange={() => handleCheckboxChange(checkbox.id)}
                    />
                    <label for={`a-${index + 1}`} class="form-check-label">
                      {checkbox.name}
                    </label>
                  </li>
                ))}
                {/* <li>
        <input id="a-1" class="form-check-input" name="a-1" type="checkbox"/>
        <label for="a-1" class="form-check-label">Air Condition</label>
      </li>
      <li>
        <input id="a-2" class="form-check-input" name="a-2" type="checkbox"/>
        <label for="a-2" class="form-check-label">Bedding</label>
      </li>
      <li>
        <input id="a-3" class="form-check-input" name="a-3" type="checkbox"/>
        <label for="a-3" class="form-check-label">Heating</label>
      </li>
      <li>
        <input id="a-4" class="form-check-input" name="a-4" type="checkbox"/>
        <label for="a-4" class="form-check-label">Internet</label>
      </li>
      <li>
        <input id="a-5" class="form-check-input" name="a-5" type="checkbox"/>
        <label for="a-5" class="form-check-label">Microwave</label>
      </li>
      <li>
        <input id="a-6" class="form-check-input" name="a-6" type="checkbox"/>
        <label for="a-6" class="form-check-label">Smoking Allow</label>
      </li>
      <li>
        <input id="a-7" class="form-check-input" name="a-7" type="checkbox"/>
        <label for="a-7" class="form-check-label">Terrace</label>
      </li>
      <li>
        <input id="a-8" class="form-check-input" name="a-8" type="checkbox"/>
        <label for="a-8" class="form-check-label">Balcony</label>
      </li>
      <li>
        <input id="a-9" class="form-check-input" name="a-9" type="checkbox"/>
        <label for="a-9" class="form-check-label">Icon</label>
      </li>
      <li>
        <input id="a-10" class="form-check-input" name="a-10" type="checkbox"/>
        <label for="a-10" class="form-check-label">Wi-Fi</label>
      </li>
      <li>
        <input id="a-11" class="form-check-input" name="a-11" type="checkbox"/>
        <label for="a-11" class="form-check-label">Beach</label>
      </li>
      <li>
        <input id="a-12" class="form-check-input" name="a-12" type="checkbox"/>
        <label for="a-12" class="form-check-label">Parking</label>
      </li> */}
              </ul>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            class="form-group col-lg-12 col-md-12"
          >
            <button
              onClick={() => {
                handleBackClick();
              }}
              class="btn btn-primary fw-medium px-5"
              type="button"
            >
              Previous
            </button>
            <LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Step4;
