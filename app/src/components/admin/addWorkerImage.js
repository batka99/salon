import firebase, {storage } from "../firebase/firebase"
import React, { useContext, useEffect, useState } from "react";
import  { getDatabase, ref, update, push, child, onValue } from "firebase/database";
import {
    uploadBytes,
    ref as refStorage,
    getDownloadURL,
    uploadBytesResumable, 
    listAll,
    list,
  } from "firebase/storage";
  import bannerImage from "../../images/avatar.png"
import AdminHome from "./adminHome";





function AddWorkerImage() {
    const [imgUrl, setImgUrl] = useState(null);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [preview, setPreview] = useState("");
    const db = getDatabase();


    const handleChange = (e)=>{
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile)
        setPreview(filePreview)
      }


    const handleUpload = () => {
        alert("ok")
        if (!file) {
            alert("Please upload an image first!");
        }
    
        const storageRef = refStorage(storage, `/profile/${file.name}`);
    
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
    
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setImgUrl(url);
                });

                const postImage = {
                    image: imgUrl,
                  };
              
                  const newPostKey = push(child(ref(db), `data/profile`)).key;
                  const updates = {};
                  updates[`/data/banner/profile` + newPostKey] = postImage;
                  return update(ref(db), updates).then(() => {
                    alert("амжилттай хадгалагдлаа")
                  })
            }
        );
    };
    






    return ( 

        <div className="">
        <div className="">
            <label className="my-4">Зураг</label>

            <div>
            {file? <><img  src={preview} alt={file.name} style={{width: "100px", borderRadius:"40px"}}/></>: <>
                    <img for="files" src={bannerImage} style={{width: "100px", borderRadius:"40px"}}  /></> }
            </div>

            <div className="m-4 ">
                    <div className="progress mt-4 text-center">
                        <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{width: `${percent}%`}}>
                    </div>
                    
                </div>
                <p>{percent}%</p>


                <input type="file" className="form-control" onChange={handleChange}  accept="/image/*" />

                <button className="btn btn-primary mt-4" onClick={handleUpload}>Хадгалах</button>

            </div>



            
            
           
            
           
            
        </div>

    </div>
   
    
     );
}

export default AddWorkerImage;