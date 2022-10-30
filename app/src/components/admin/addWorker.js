import React, {useState, useContext, useEffect} from "react";

import  { getDatabase, ref, update, push, child, onValue } from "firebase/database";
import axios from "../axios/axios"
import AdminHome from "./adminHome";




function AddWorker() {
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [ctg, setCtg] = useState()

    const db = getDatabase();



    const newWorker =()=> {
        const categoryData = {
            name: name,
          };
          const newCategoryKey = push(child(ref(db), `data/category`)).key;
          const updateCategory = {};
          updateCategory[`/data/category/` + newCategoryKey] = categoryData;
          return update(ref(db), updateCategory).then(() => {
            alert("амжилттай хадгалагдлаа")
          })
          

    

  }
  const removeCategory = () => {
      axios.delete(`data/category/${ctg}.json`).then(()=>alert("Устгагдлаа"))
    }






    useEffect(() => {

        const refUrl = ref(db, `data/category`)
        onValue(refUrl, (snapshot) => {
          const data = snapshot.val();
          const dataList = [];
          for (let id in data) 
          {dataList.push({id, ...data[id] });}
          setCategory(dataList);
        });
}, []);

    



    return (
     



            <div className="container">
                <AdminHome/>

                <div className="card">

                <form>
                    <div className="form-group">
                        <div className="mx-4 my-4">
                        <label className="mb-2">Төрөл нэмэх</label>
                        <input onChange={e => setName(e.target.value)} placeholder="төрөл" type="text" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-dark" onClick={newWorker}>Хадгалах</button>
                    </div>
                </form>


                <div className="form-group">
                    <div className="mx-4 my-4">
                    <label className="mb-2">Төрөл устгах</label>
                    <select onChange={e => setCtg(e.target.value)} value={ctg} className="form-control" data-placeholder="Choose one" data-parsley-class-handler="#slWrapper" data-parsley-errors-container="#slErrorContainer" required>
                        <option label="Сонгох" />
                        {category? category.map((element, index ) => (<option value={element.id} >{element.name}</option>)): ""}
                     </select>
                    </div>
                    <button type="submit" className="btn btn-danger mb-4" onClick={removeCategory}>Устгах</button>
                </div>

                </div>



  
      

            </div>



    );
}

export default AddWorker;