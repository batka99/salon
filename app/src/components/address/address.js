import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'


function Address() {
    return ( 
    <div className="mb-4">
        
    
            <div class="row m-2">
                <div class=" card mb-2 " style={{backgroundor:"#afeeee", borderRadius:"20px"}}>
               
                <h4 className="font-weight-bold mt-2 "> <FontAwesomeIcon style={{color:"red"}} icon={faLocationDot}/> Хаяг</h4>
                <p>ХУД 24-р хороо Хан оффис 4 давхар 301</p>
                </div>
                <a href='tel:80551166' class="card mb-2 " style={{backgroundColor:"#afeeee", borderRadius:"20px", textDecoration: "none", color:"black"}}>
               
                <h4 className="font-weight-bold mt-2 "><FontAwesomeIcon style={{color:"red"}} icon={faPhone}/> Холбоо барих</h4>
                <p>80551166</p>
                
                </a>
            </div>


    
    
    
    </div> );
}

export default Address;