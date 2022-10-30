import React, { useEffect, useState } from "react";



function Footer() {
    const [day, setDay] = useState()


 

       
    useEffect(() => {

        setDay(new Date().getFullYear())
    
    
        
      }, []);




    return ( <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" style={{borderRadius:"20px", backgroundColor:"#afeeee"}}>
        <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width={30} height={24}><use xlinkHref="#bootstrap" /></svg>
            </a>
            <span className="mb-3 mb-md-0 text-muted text-center">© {day} Зохиогчийн эрх хамгаалагдсан</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#twitter" /></svg></a></li>
            <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#instagram" /></svg></a></li>
            <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#facebook" /></svg></a></li>
        </ul>
        </footer>
    </> );
}

export default Footer;