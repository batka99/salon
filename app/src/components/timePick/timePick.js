import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns'
import mn from 'date-fns/locale/mn';
import { getDatabase, ref,onValue, update, orderByChild, equalTo, query, push, child } from "firebase/database";
import Modal from 'react-modal'
import avatar from "../../images/avatar.png"
import {Routes, Route, Switch, Link } from "react-router-dom";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');









function TimePick() {
    const [startDate, setStartDate] = useState(new Date());
    const [days, setDays] = useState(new Date());
    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [data, setData] = useState([])
    const [title, setTitle] = useState([])
    const db = getDatabase();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [paymentIsOpen, setPaymentIsOpen] = React.useState(false);






  function openPayment() {
    alert("Захиалга амжилттай хийгдлээ")
    closeModal()
    setPaymentIsOpen(true);
  }

  function afterOpenPayment() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closePayment() {
    setPaymentIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


    const checkDate =()=>{    
    
        const newPostKey = push(child(ref(db), 'data/timePiker')).key;
          update(ref(db, 'data/timePiker/' + newPostKey), {
            date: `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`,
            time: "18:00",
            type: "Сормуус"
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
    
      useEffect(() => {
        const refUrl = query(ref(db, `data/timePiker`), orderByChild("date"), equalTo(`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`))
                    onValue(refUrl, (snapshot) => {
                      const data = snapshot.val()
                      console.log(data)
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

        


    
    
        
      }, []);





  


 




    return ( <>

    <div className=" mt-4">
   
  
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="text-center mb-2">Баталгаажуулах</h5>
        
        <form>
            <input placeholder="Таны нэр" className="form-control my-4"></input>
            <input placeholder="Утасны дугаар" className="form-control mb-4"></input>
            <div className="row">
            <button className="btn btn-danger m-2 col-5" onClick={openPayment}>Хадгалах</button>
            <button className="btn btn-info m-2 col-5" onClick={closeModal}>Хаах</button>

            </div>
        </form>
      </Modal>

      {/* <Modal
        isOpen={paymentIsOpen}
        onAfterOpen={afterOpenPayment}
        onRequestClose={closePayment}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="text-center mb-2">Урьдчилгаа төлөх</h5>
        
        <form>
            <p className="text-center">Та qpay ашиглан Урьдчилгаа төлөх үү?
            Урьдчилгаа төлсний дараа таны захиалга баталгаажих болно.</p>
            <div className="row">
            <button className="btn btn-danger m-2 col-5">Хадгалах</button>
            <button className="btn btn-info m-2 col-5" onClick={closePayment}>Хаах</button>

            </div>
        </form>
      </Modal> */}
        <div className="row">
                <div className="row d-flex justify-content-center">
                    <div className="col-3">
                        <p>Өдөр сонгох : </p>
                    </div>
                    <div className="input-group-prepend col-5">
                            <div className="input-group mb-3"  >
                            
                            <DatePicker
                            dateFormat="yyyy/MM/dd"
                            selected={startDate}
                            className="form-control text-center"
                            closeOnScroll={getDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 5)}
                            timeCaption="Цаг"
                            placeholderText="он сонгох"
                            withPortal
                            locale={mn}
                        />    
                        </div>
                </div>
                <div className="col-3">
                <button onClick={getDate} className="btn" style={{backgroundColor:"#afeeee"}}>Шалгах</button>
                </div>
            
                </div>
          
                


        </div>

          <h5> {title} өдрийн хуваарь</h5>

        <table className="table table-bordered  " style={{verticalAlign: "middle", alignItems:"center"}}>
            <thead >
                <tr  style={{backgroundColor:"#afeeee"}}>
                <th scope="col">Зураг</th>
                <th scope="col">Төрөл</th>
   
                <th scope="col">Цаг</th>
                <th scope="col">захиалга</th>
             
                </tr>
            </thead>
            <tbody>
            {data? data.map((element, index)=>(<>
                <tr className="hover">
                <th scope="row" rowSpan={2}><img
                  style={{borderRadius: "40px", width:"60px", height:"60px"}}
                  src={element.image}
                  
                /><br/>{element.name}</th>
                <td className="" rowSpan={2}>{element.type}</td>
             
                <td rowSpan={2}>{element.time}</td>
                <td rowSpan={2}><button onClick={openModal} className="btn btn-warning btn-sm">Захиалах</button></td>
             
                </tr>
                <tr className="">
            
                
                </tr>
                
                
                
                </>)):
                <tr className="text-center">
                    <td colspan="5">
                        <p className="my-4">Уучлаарай одоогоор товлолт цаг байхгүй байна</p>
                    </td>
                </tr>}
            </tbody>
        </table>

    </div>


    
    
    </> );
}

export default TimePick;