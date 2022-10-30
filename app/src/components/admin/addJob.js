import React, {useState, useContext, useEffect} from "react";
import  { getDatabase, ref, update, push, child, onValue } from "firebase/database";
import axios from "../axios/axios"
import AdminHome from "./adminHome";
import AddWorkerImage from "./addWorkerImage";
import firebase, {storage } from "../firebase/firebase"
import {
    uploadBytes,
    ref as refStorage,
    getDownloadURL,
    uploadBytesResumable, 
    listAll,
    list,
  } from "firebase/storage";
  import bannerImage from "../../images/avatar.png"




function AddJob() {
    const [name, setName] = useState()
    const [jobData, setJobData] = useState()
    const [ctg, setCtg] = useState()
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







    const addJobData =()=> {

        if (!file) {
            alert("Та зураг оруулна уу");
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
              
                  const newPostKey = push(child(ref(db), `data/profile/`)).key;
                  const updates = {};
                  updates[`/data/profile/` + newPostKey] = postImage;
                  return update(ref(db), updates).then(() => {
                    alert("амжилттай хадгалагдлаа")
                  })
                

 
            }
        );




          

    

  }

  const HandleSave = () =>{

    
    const jobData = {
        name: name,
        image: imgUrl
      };
      const newJobDataKey = push(child(ref(db), `data/profile`)).key;
      const updateJobData = {};
      updateJobData[`/data/profile/` + newJobDataKey] = jobData;
      return update(ref(db), updateJobData).then(() => {
        alert("амжилттай хадгалагдлаа")
      })


  }




  const removeJobData = () => {
      axios.delete(`data/profile/${ctg}.json`).then(()=>alert("Устгагдлаа"))
    }






    useEffect(() => {
        const refUrl = ref(db, `data/profile`)
        onValue(refUrl, (snapshot) => {
          const data = snapshot.val();
          const dataList = [];
          for (let id in data) 
          {dataList.push({id, ...data[id] });}
          setJobData(dataList);
        });
}, []);

    



    return (
        <>

<div className="container">
                <AdminHome/>


                <div className="card">

      

                    
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
                           <div className="row">
                                <div className="col-6">
                                    <input type="file" className="form-control" onChange={handleChange}  accept="/image/*" />
                                </div>
                                <div className="col-6">
                                <button className="col-12 btn btn-primary" onClick={addJobData} >upload</button>
                                </div>
                           

                            

                           </div>
                        </div>
                    </div>
                </div>




                
                    <div className="form-group">
                        <div className="mx-4 my-4">
                        <label className="mb-2">Ажилтан нэмэх</label>
                        <input onChange={e => setName(e.target.value)} placeholder="Жишээ нь: Сормуус Артист Лхагвадулам" type="text" className="form-control" />
                        
                        </div>
                        <div className="mx-4">
                            <button type="submit" className="col-12 btn btn-dark mb-4" onClick={HandleSave}>Хадгалах</button>
                        </div>
                    </div>
             


                

                </div>

                <div className="card mt-4">
                <div className="form-group">
                    <div className="mx-4 my-4">
                    <label className="mb-2">Ажилтан устгах</label>
                    <select onChange={e => setCtg(e.target.value)} value={ctg} className="form-control" data-placeholder="Choose one" data-parsley-class-handler="#slWrapper" data-parsley-errors-container="#slErrorContainer" required>
                              <option label="Сонгох" />
                              {jobData? jobData.map((element, index ) => (<option value={element.id} >{element.name}</option>)): ""}
                    </select>
                    </div>
     
                    <div className="mx-4">
                            <button type="submit" className="col-12 btn btn-danger mb-4" onClick={removeJobData}>Устгах</button>
                        </div>
                </div>

                </div>



  
      

            </div>







        </>
    );
}

export default AddJob;