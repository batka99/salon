import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useContext } from "react";
import firebase from './components/firebase/firebase'
import TimePick from './components/timePick/timePick';
import Home from './components/home/home';
import {Routes, Route, Switch } from "react-router-dom";
import Login from './components/admin/login';
import UserContext from './components/context/UserContext';
import AdminHome from './components/admin/adminHome';
import AddTime from './components/admin/addTime';
import AddImage from './components/admin/addBanner';
import AddWorker from './components/admin/addWorker';
import AddJob from './components/admin/addJob';









function App() {
  const ctxUser = useContext(UserContext)
  console.log(ctxUser.state)




  


  return (
    <div className="App">
       <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<AdminHome/>}/>
            <Route path="/addworker" element={<AddWorker/>} />   
            <Route path="/addBanner" element={<AddImage/>} />   
            <Route path="/addtime" element={<AddTime/>} />   
            <Route path="/addjob" element={<AddJob/>} />   

      </Routes>
      {/* {ctxUser.state.userId? <>
        <Routes>
            <Route path="/" element={<Home/>}/>
      </Routes>
      </>:<><Routes>
            
            {ctxUser.state.userId? <><Route path="/login" element={<Admin/>}/></>:<><Route path="/login" element={<Login/>}/></>}
            
      </Routes></>} */}
   
      
      
      

       
    </div>
  );
}

export default App;
