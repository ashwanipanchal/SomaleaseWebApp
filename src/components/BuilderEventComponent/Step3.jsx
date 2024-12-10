import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderButton from "../LoaderButton/LoaderButton";
import { add_broadcast_builder, fileUploadMultiple, } from "../../api/auth";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Step3 = ({ stepNumber, currentStep, incrementStep, prevStep, handleDataChange, passData }) => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState(false);
  const [about, setAbout] = useState('');
  const [files, setFiles] = useState([]);
  const [filesImage, setFilesNewImage] = useState([]);
  const [UploadedImageResponse, setUploadedImageResponse] = useState("");

  const handleClick = async(e) => {
	e.preventDefault()
      // console.log(UploadedImageResponse)
      // return
	    setIsLoading(true);

      const body = {
        user_id: localStorage.getItem("user_id"),
        title: passData?.eventTopic,
        host_name: "",
        description: passData?.about,
        video_link: passData?.inputFields.map(i => {
            return i.link;
          })
          .join('|'),
        start_time: `${passData?.eventDate.split("T")[0]} ${passData?.eventDate.split("T")[1]}:00`,
        total_minutes: passData?.duration,
        image_name: UploadedImageResponse[0]?.nameimg?.split("|")[0],
        image: UploadedImageResponse[0]?.nameimg,
        // image_name: property[0]?.nameimg.split("|")[0],
        // image: property[0]?.nameimg,
      }
    
      // console.log(body)
      // return
  
      const res = await add_broadcast_builder(body)
      setIsLoading(false);
      console.log(res)
      if(res.status){
        showAlert()
      }	
  };

  const showAlert = async(res) => {
    MySwal.fire({
      title: "Event added successfully",
      icon: "success",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
      }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        // navigate("my_account/builder")
        navigate(-1)
        }
      });
  }


  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    uploadImage(acceptedFiles)
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg",  ".jpg", ],
      // "video/*": [".mp4", ".mkv", ".avi"],
    },
  });

  const uploadImage = async(files) => {
    let formData = new FormData();
    const imageFiles = [];
      Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        imageFiles.push(file);
      }
    });

      setFilesNewImage(imageFiles)
      imageFiles.forEach((image, index) => {
        formData.append(`uploadfile[]`, image);
      });

      const res = await fileUploadMultiple(formData)
      console.log(res)
      if(res.status){
        setUploadedImageResponse(res.nameimg)
        // setImage
        toast.success("File uploaded successfully.")
      }
  }


  return (
    <div class="form-submit">
      {/* <h3>Basic Information</h3> */}
      <div class="submit-section">
        <div class="row">
        <label style={{marginBottom:"20px"}}>Add Photo</label>
        <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                padding: "20px",
                textAlign: "center",
                marginBottom:"20px",
                backgroundColor: isDragActive ? "#f0f0f0" : "#ffffff",
                cursor: "pointer",
              }}
            >
              <input onChange={e => console.log(e.target.files)} {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>

        </div>

        <div style={{ marginTop: '20px' }}>
        {/* <h3>Uploaded Files:</h3> */}
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px', marginBottom:'10px' }}
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px', marginBottom:'10px' }}
                ></video>
              )}
              {file.name}
            </li>
          ))}
        </ul>
      </div>

        <div class="form-group col-lg-12 col-md-12">
		<LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
        </div>
      </div>
	  <ToastContainer />
    </div>
  );
};


export default Step3;
