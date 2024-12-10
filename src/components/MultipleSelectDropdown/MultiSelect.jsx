import React from "react";

const MultiSelect = ({values, onhandleChange, value}) => {
    console.log(values)
  return (
    <div class="form-group col-md-6">
      <label>Responsibilties</label>
      <select
        multiple
        value={value}
        onChange={onhandleChange}
        id="status"
        class="form-control"
      >
        <option value="">Select</option>
        {values?.map((i) => (
          <option value={i.name}>{i.name}</option>
        ))}
      </select>
      
    </div>
  );
};

export default MultiSelect;
