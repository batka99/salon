import Carousel from 'react-bootstrap/Carousel';
import React, { useContext, useEffect, useState } from "react";
import  { getDatabase, ref, update, push, child, onValue } from "firebase/database";

import eee from "../../images/eye.png"
import eye from "../../images/eeee.jpg"
import wal from "../../images/wallpaper.jpg"
import wals from "../../images/wallpapers.jpg"
import style from  "./carouselStyle.css"



function MainCarousel() {
  const [banner, setBanner] = useState([]);
  const db = getDatabase();



  useEffect(() => { 

       const refUrl = ref(db, `data/banner`)
        onValue(refUrl, (snapshot) => {
          const data = snapshot.val();
          const dataList = [];
          for (let id in data) 
          {dataList.push({id, ...data[id] });}
          setBanner(dataList);

        });


  }, []);



    return ( 
      <>



<Carousel >
      {banner? banner.map((element, index)=>(
      <Carousel.Item > 
        <img
          style={{borderRadius:"20px", height:"200px"}}
          className="d-block w-100 h-100"
          src={element.image}
          alt="slide"/>
      </Carousel.Item>

      
    )):""}


    </Carousel>

        

    
    </>
     );
}

export default MainCarousel;