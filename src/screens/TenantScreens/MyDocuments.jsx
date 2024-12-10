import React, { useState, useCallback, useEffect } from "react";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useDropzone } from "react-dropzone";
import { add_document, landlord_side_documents, my_apartment_for_tenant, send_document_to_user, send_document_to_user2, tenant_side_documents } from "../../api/auth";
import ScreenLoader from "../../components/LoaderButton/ScreenLoader";
import { toast, ToastContainer } from "react-toastify";

const MyDocuments = ({ type }) => {
  console.log(type)
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesImage, setFilesNewImage] = useState([]);
  const [listOfDocs, setListOfDocs] = useState([]);

  const [data, setData] = useState({});
  const [about, setAbout] = useState('');
  const [tempImageUrl, setTempImageUrl] = useState('');

  useEffect(() => {
      const user_id = localStorage.getItem("user_id");
    if(type == 3){
        getList1(user_id)
    }
    if(type == 1){
        getList2(user_id)
    }
    if(type == 2){
        getList3(user_id)
    }
  }, []);

  const getList1 = async (id) => {
        setLoading(true)
    const res = await my_apartment_for_tenant({
        user_id: id.toString(),
    });
    setLoading(false)
    if (res.status) {
        setListOfDocs(res.data);
    }
    };

  const getList2 = async (id) => {
        setLoading(true)
    const res = await tenant_side_documents({
        user_id: id.toString(),
    });
    setLoading(false)
    if (res.status) {
        setListOfDocs(res.data);
    }
    };

  const getList3 = async (id) => {
        setLoading(true)
    const res = await landlord_side_documents({
        user_id: id.toString(),
    });
    setLoading(false)
    if (res.status) {
        setListOfDocs(res.data);
    }
    };


  const onDrop = useCallback((acceptedFiles) => {
    uploadImage(acceptedFiles)
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
    //   "image/*": [".jpeg", ".png", ".jpg", ".gif", ".pdf"],
      "image/*": [".pdf"],
    },
  });

  const uploadImage = async(file) => {
    const user_id = localStorage.getItem("user_id");
    let formData = new FormData();
    formData.append('user_id', user_id);

    formData.append('image',file);

      const res = await add_document(formData)
      setLoading(true)
      console.log(res)
      if(res.status){
        setTempImageUrl(res.filepath)
        setLoading(false)
        toast.success("File uploaded successfully.")
      }


  
  }

  const handleChange = (event) => {
      const selectedValue = event.target.value;
      const selectedObj = JSON.parse(selectedValue);
      setData(selectedObj);
  };


  const handleClick = async(e) => {
    if (Object.keys(data).length == 0) {
        toast.error('Please select Property');
        return;
      }
      if (about == '') {
        toast.error('Please enter Document Name');
        return;
      }
  
      if (tempImageUrl == 0) {
        toast.error('Please select File');
        return;
      }

      setIsLoading(true);
      const ids = localStorage.getItem("user_id");
      if(type ==3) {
        const res = await send_document_to_user({
            owner_id: data.property_owner_id,
            document_name: about,
            document_file: tempImageUrl,
            property_id: data.property_id,
            user_id : ids.toString()
          })
        setIsLoading(false);
        console.log(res)
        if(res.status){
            toast.success("Document sent successfully.")
            set
        }
      }else{
        const res = await send_document_to_user2({
            owner_id: ids.toString(),
            document_name: about,
            document_file: tempImageUrl,
            property_id: data.property_id,
          })
        setIsLoading(false);
        console.log(res)
        if(res.status){
            toast.success("Document sent successfully.")
        }
      }
      
  }

  if(loading){
    return(
        <ScreenLoader/>
    )
}

  return (
    <div class="dashboard-wraper">
      <div class="form-submit">
        <h4>My Documents</h4>
        <div class="submit-section">
          <div class="row">
            <div class="form-group col-md-12">
              <label>Select Property</label>
              <select
                // value={propertyAs}
                onChange={(e) => handleChange(e)}
                id="status"
                class="form-control"
              >
                <option value="">Select</option>
                {listOfDocs?.map((item) => (
                    <option value={JSON.stringify(item)}>{`${item.apartment_name || item?.properties?.apartment_name}-${item.apartment_no || item?.properties?.apartment_no}-${item.floor || item?.properties?.floor}`}</option>
                ))}
              </select>
            </div>

            <div class="form-group col-md-12">
              <label>Document Name</label>
              <textarea
                 value={about}
                    onChange={(e) => setAbout(e.target.value)}
                class="form-control h-120"
              ></textarea>
            </div>

            <div class="form-group col-md-12">
              <label>Upload File</label>
              {/* <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #cccccc",
                  padding: "20px",
                  textAlign: "center",

                  backgroundColor: isDragActive ? "#f0f0f0" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                <input
                  onChange={(e) => console.log(e.target.files)}
                  {...getInputProps()}
                />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div> */}
              <input type="file" accept=".pdf" onChange={(e) => uploadImage(e.target.files[0])}/>
            </div>

            <div style={{ marginTop: "20px" }}>
              {/* <h3>Uploaded Files:</h3> */}
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="uploaded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      ></video>
                    )}
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="form-submit">
        {/* <h4>Social Accounts</h4> */}
        <div class="submit-section">
          <div class="row">
            <div class="form-group col-lg-12 col-md-12">
              <LoaderButton title={"Send"} onClick={e => handleClick(e)} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MyDocuments;
