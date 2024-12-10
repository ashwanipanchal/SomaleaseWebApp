import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { fileUploadMultiple, post_properties_step6 } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import LoaderButton from "../LoaderButton/LoaderButton";
import { GlobalContext } from "../../contexts/GlobalProvider";

const Step5 = ({ stepNumber, currentStep, incrementStep, passData, handleDataChange }) => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  console.log(globalData)

  const handleButtonClick = () => {
    incrementStep();
  };

  const handleBackClick = () => {
    prevStep();
  };
  const [files, setFiles] = useState([]);
  const [filesImage, setFilesNewImage] = useState([]);
  const [UploadedImageResponse, setUploadedImageResponse] = useState("");
  const [filesVideo, setFilesNewVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    uploadImage(acceptedFiles)
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      "video/*": [".mp4", ".mkv", ".avi"],
    },
  });

  const uploadImage = async(files) => {
    let formData = new FormData();
    const imageFiles = [];
    const videoFiles = [];
       // Separate files based on type
       Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          imageFiles.push(file);
        } else if (file.type.startsWith('video/')) {
          console.log("here")
          videoFiles.push(file);
        }
      });

      setFilesNewImage(imageFiles)
      setFilesNewVideo(videoFiles)
      imageFiles.forEach((image, index) => {
        formData.append(`uploadfile[]`, image);
      });
  
      // Append videos to FormData
      videoFiles.forEach((video, index) => {
        formData.append(`uploadfile[]`, video);
      });

      const res = await fileUploadMultiple(formData)
      // setIsLoading(false);
      console.log(res)
      if(res.status){
        setUploadedImageResponse(res.nameimg)
        // setImage
        toast.success("File uploaded successfully.")
      }


      // setFilesNew({ images: imageFiles, videos: videoFiles });
  
  }


  const handleClick = async() => {
    if(filesImage.length == 0 && filesVideo == 0){
      console.log("if")
      toast.error("Please upload file")
      return
    }
    setIsLoading(true);
    const body = {
      id: globalData?.Updated_Res_Data?.id,
      gallery: UploadedImageResponse,
      // video: filesVideo,
      // gallery: property[0]?.nameimg,
      // video: video[0]?.nameimg,
    }
  
    console.log(body)
    // return

    const res = await post_properties_step6(body)
    setIsLoading(false);
    console.log(res)
    if(res.status){
      // handleDataChange(res);
      setGlobalData({ ...globalData,  Updated_Res_Data: res.data, Add_Flat_ID: res.data.id, });
      incrementStep()
    }

  }

  
  return (
    <div class="form-submit">
      <h3>Gallery</h3>
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-12">
            {/* <label>Upload Gallery</label>
												<form action="https://shreethemes.net/upload-target" class="dropzone dz-clickable primary-dropzone">
													<div class="dz-default dz-message">
														<i class="fa-solid fa-images"></i>
														<span>Drag & Drop To Change Logo</span>
													</div>
												</form> */}

            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                padding: "20px",
                textAlign: "center",
                
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

      <div style={{display:'flex', justifyContent:'space-between'}} class="form-group col-lg-12 col-md-12">
									<button onClick={() => {
                                        handleBackClick()
										} }class="btn btn-primary fw-medium px-5" type="button">Previous</button>
									<LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
								</div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Step5;
