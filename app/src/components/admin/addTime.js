import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DatePicker from "react-datepicker";
import NavDropdown from 'react-bootstrap/NavDropdown';
import eee from "../../images/logo.png"
import mn from 'date-fns/locale/mn';
import { addDays } from 'date-fns'
import { getDatabase, ref,onValue, update, orderByChild, equalTo, query, push, child } from "firebase/database";
import TimePick from "../timePick/timePick";
import AddWorker from "./addWorker";
import AdminHome from "./adminHome";





function AddTime() {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState([])
    const [boj, setJob] = useState()
    const [jobData, setJobData] = useState()
    const [jobName, setJobName] = useState()
    const [jobImage, setJobImage] = useState()
    const [category, setCategory] = useState()
    const [title, setTitle] = useState()
    const [ctg, setCtg] = useState()
    const [days, setDays] = useState(new Date());
    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [data, setData] = useState([])
    const db = getDatabase();
    let subtitle;





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

    useEffect(() => { 


      const refUrl = ref(db, `data/profile`)
      onValue(refUrl, (snapshot) => {
        const data = snapshot.val();
        const dataList = [];
        for (let id in data) 
        {dataList.push({id, ...data[id] });}
        setJob(dataList);
      });
    }, []);


    const tome = (time) => {
        const hour = Math.floor(startDate.getTime()%(24*60*60*1000)/(1000*60*60))
        console.log(startDate)
        console.log(startDate.getHours())
        
      };

    const hour = startDate.getHours()
    const hours = (hour < 10) ? "0" + hour : hour;
    const minute = Math.floor(startDate.getTime()/60000 % 60)
    const minutes = (minute < 10) ? "0" + minute : minute;
    const timeData = `${hours}:${minutes}`

    const checkDate =()=>{    
    
        const newPostKey = push(child(ref(db), 'data/timePiker')).key;
          update(ref(db, 'data/timePiker/' + newPostKey), {
            date: `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`,
            time: timeData,
            type: ctg,
            name: jobName,
            image: jobImage
          }).then(() => {
            alert("ok")
          });
        if(startDate.getDate() == new Date().getDate()){
          setDays(true)
        }else{
          setDays(false)
        }
        console.log(startDate.getMonth()+1)
        console.log(startDate.getDate())
        console.log(startDate.getFullYear())
      }
      const getDate = (e) => {
        const refUrl = query(ref(db, `data/timePiker`), orderByChild("date"), equalTo(`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`))
                onValue(refUrl, (snapshot) => {
                  const data = snapshot.val()
                  // console.log(data)
                  const dataList = [];
                  if(data===null){
                    setData(false)
                  }else{
                    for (let id in data) 
                  {dataList.push({id, ...data[id] });}
                    setData(dataList);
                    setTitle(dataList[0].date);
                  }
                });

    
    
  }
  const test = (e)=>{
    var value = e.target.value
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('data-id');
    setJobName(option)
    setJobImage(value)
  }
    
    return ( 
        <div className='container'>
          <button onClick={test}>dar</button>

        
          <AdminHome/>
              <div className='card'>

              <div className="form-group">
                <div className="mx-4 my-4">
                  <label className="mb-2">Төрөл сонгох</label>
                    <select class="form-control" onChange={e => setCtg(e.target.value)} value={ctg}>
                    <option label="Сонгох" />
                    {category? category.map((element, index ) => (<option >{element.name}</option>)): ""}
                    </select>
                </div>
                </div>
                <div className="form-group">
                  <div className="m-4">
                    <label className="mb-2">Ажилтан сонгох</label>
                    <select class="form-control" onChange={test} >
                    <option label="Сонгох" />
                    {boj? boj.map((element, index ) => (<option value={element.image} data-id={element.name}>{element.name}</option>)): ""}
                    </select>
                  </div>
              
                </div>
                
                <div className="">
                <div className="form-group">
                <div className="m-4">
                    <h2></h2>
                    <label className="mb-2">Цаг сонгох</label>
                <DatePicker
                    locale={mn}
                    selected={startDate}
                    className="form-control text-center"
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 5)}
                    timeCaption="Цаг"
                    placeholderText="он сонгох"
                    dateFormat="yyyy/MM/dd hh:mm"
                    withPortal
                    timeIntervals={15}
                    showTimeSelect
                    
                />

                <button onClick={checkDate} className="btn btn-primary mt-4 mx-4">Хадгалах</button>
                </div>
                

                {data? data.map((element, index)=>(<><br/>{element.date}<br/> {element.time}</>)):""}
                </div>
        

      </div> 
                </div>


    

        </div>

        
);
}

export default AddTime;