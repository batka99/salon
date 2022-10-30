import React, {useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faLock, faPhone } from '@fortawesome/free-solid-svg-icons'
import UserContext from "../context/UserContext";


function Login() {
    const ctx = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogIn =()=>{
        ctx.loginUser(email, password)
    }

   
    return (  
        <div className="container" style={{ display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div className="login-box"  >
  {/* /.login-logo */}
      <div className="card shadow p-4">
        <div className="card-body">
          <h4>Нэвтрэх</h4>
         
            <div className="input-group mb-3">
              <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Нэвтрэх нэр" />
              <div className="input-group-append">
                <div className="input-group-text">
                <FontAwesomeIcon className="p-2" icon={faEnvelope}/>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Нууц үг" />
              <div className="input-group-append">
                <div className="input-group-text">
                <FontAwesomeIcon  className="p-2"  icon={faLock}/>
                </div>
              </div>
            </div>
            
            <div className="row">
              {/* /.col */}
              <div className="col-12 text-center">
                <button onClick={handleLogIn} type="submit" style={{backgroundColor:"#afeeee"}} className="btn">Нэвтрэх</button>
              </div>
              {/* /.col */}
            </div>
       
      
        </div>
    {/* /.login-card-body */}
  </div>
</div>
      




      </div>

    );
}

export default Login;