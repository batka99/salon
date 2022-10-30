import  React from "react"
import eye from "../../images/eye.png"
import eee from "../../images/eeee.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TimePick from "../timePick/timePick";
import NavScroll from "../navbar/navbar";
import Carousel from "../carousel/carousel";
import Map from "../map/map";
import Address from "../address/address";
import Footer from "../footer/footer";








function Home() {
    return (  
    <div className="container mt-4">
        <NavScroll/>
        <Carousel/>
        <TimePick/>
        <Address/>
        <Map/>
        <Footer/>
   
    </div>);
}

export default Home;