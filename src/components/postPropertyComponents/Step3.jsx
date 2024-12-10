import React,{useState, useEffect} from "react";
import { master_available_from, master_currency, master_furnishings, post_properties_step3 } from "../../api/auth";
import LoaderButton from "../LoaderButton/LoaderButton";
import { toast, ToastContainer } from "react-toastify";

const Step3 = ({
  stepNumber,
  currentStep,
  incrementStep,
  prevStep,
  passData,
  handleDataChange,
}) => {


  const [property, setProperty] = useState('1');
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthly, setMonthly] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [availble, setAvailble] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [currency, setCurrency] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //Masters
  const [allCurrency, setAllCurrency] = useState([]);
  const [avaliableFrom, setAvaliableFrom] = useState([]);
  const [allFurnishing, setAllFurnishing] = useState([]);

  useEffect(() => {
    getCurrencyMaster();
	getAvaliableFromMaster()
	getFurnishingMaster()
  }, []);

  const getCurrencyMaster = async () => {
    const res = await master_currency();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.symbol;
      });
      setAllCurrency(temp);
    }
  };

  const getAvaliableFromMaster = async () => {
    const res = await master_available_from();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setAvaliableFrom(temp);
    }
  };

  const getFurnishingMaster = async () => {
    const res = await master_furnishings();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setAllFurnishing(temp);
    }
  };

  const handleButtonClick = () => {
    incrementStep();
  };

  const handleBackClick = () => {
    prevStep();
  };

  const handleClick = async(e) => {
	e.preventDefault()
    
	if (currency == '') {
		toast.error('Please select currency');
		return;
	  }

	if(property == 1){
	  if (rent == '') {
		toast.error('Please enter your expected rent');
		return;
	  }
	}
	if(property == 1){
	  if (deposit == '') {
		toast.error('Please enter your expected deposit');
		return;
	  }
	}
	if(property == 2){
	  if (sellingPrice == '') {
		toast.error('Please enter your selling price');
		return;
	  }
	}
	
	if (monthly == '') {
	  toast.error('Please enter monthly maintainance');
	  return;
	}

	if (availble == '') {
	  toast.error('Please select available form');
	  return;
	}
	if (furnishing == '') {
	  toast.error('Please select furnishing');
	  return;
	}
	
	setIsLoading(true);

	let formdata = new FormData();
	formdata.append('id', passData?.data?.id);
	formdata.append('property_available', property == "1" ? 1 : 2);
	formdata.append('expected_rent', rent);
	formdata.append('expected_deposit', deposit);
	formdata.append('selling_price', sellingPrice);
	formdata.append('monthly_maintenance', monthly);
	formdata.append('currency', currency);
	formdata.append('available_from', availble);
	formdata.append('furnishing', furnishing);

	const res = await post_properties_step3(formdata)
	setIsLoading(false);
	console.log(res)
	if(res.status){
		handleDataChange(res);
		incrementStep()
	}

  };

  return (
    <div class="form-submit">
      <h3>Detailed Information</h3>
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-6">
            <label>Property available for</label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              id="status"
              class="form-control"
            >
              <option value="1">Only Rent</option>
              <option value="2">For Sale</option>
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} id="status" class="form-control">
			<option value="">Select</option>
              {allCurrency?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

		{/* For Rent */}
          {property == "1" && (
            <>
              <div class="form-group col-md-6">
                <label>Expected Rent (Per Month)</label>
                <input value={rent} onChange={e => setRent(e.target.value)} type="text" class="form-control" />
              </div>

              <div class="form-group col-md-6">
                <label>Expected Deposit</label>
                <input value={deposit} onChange={e => setDeposit(e.target.value)}  type="text" class="form-control" />
              </div>
            </>
          )}

		  {/* For Sale */}
          {property == "2" && (
            <div class="form-group col-md-6">
              <label>Selling Price</label>
              <input value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} type="text" class="form-control" />
            </div>
          )}

          <div class="form-group col-md-6">
            <label>Monthly Maintenance</label>
            <input value={monthly} onChange={e => setMonthly(e.target.value)} type="text" class="form-control" />
          </div>

          <div class="form-group col-md-6">
            <label>Available From</label>
            <select  value={availble} onChange={e => setAvailble(e.target.value)} id="status" class="form-control">
			<option>Select</option>
              {avaliableFrom?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Furnishing</label>
            <select value={furnishing} onChange={e => setFurnishing(e.target.value)} id="status" class="form-control">
			<option >Select</option>
              {allFurnishing?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
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

export default Step3;
