import React, { useState } from "react";
import axios from "axios"

const UserContext = React.createContext();

const initialState = {
    saving: false,
    logginIn: false,
    error: null,
    errorCode:null,
    token:null,
    userId: null,
    expireDate: null
    
}


export const UserStore = (props) => {
    const [state, setState] = useState(initialState);


    const loginUserSuccess = (token, userId, expiresIn, expireDate, refreshToken ) =>{
        localStorage.setItem("token", token);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expiresIn", expiresIn);
        localStorage.setItem("refreshToken", refreshToken);
        setState({
            ...state, 
            logginIn: false, 
            error:null, 
            errorCode:null, 
            token: token, 
            userId: userId,
            expiresIn: expiresIn,
            expireDate: expireDate,
            refreshToken: refreshToken
            });    

    }
 

    const autoRenewTokenAfterMillisec = (milliSec) => {
      // token shinechleh code
      axios.post("https://securetoken.googleapis.com/v1/token?key=ozhGWzXOWsn9pWB3BVYSjZVlBBsQ4hSH7cnRubkH",
          {   
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refreshToken"),
          }
        )
        .then((result) => {
          console.log("Token refreshed .....", result);
          const token = result.data.id_token;
          const userId = result.data.user_id;
          const expiresIn = result.data.expires_in;
          const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
          const refreshToken = result.data.refresh_token;
          loginUserSuccess(token, userId, expiresIn, expireDate, refreshToken);
        })
        .catch((err) => {
          setState({
            ...state,
            logginIn: false,
            // error: err.message,
            // errorCode: err.code,
            token: null,
            userId: null,
            expireDate: null,
          });
        });
  
      // avtomat logout
      setTimeout(() => {
        // logout
        autoRenewTokenAfterMillisec(360000);
      }, milliSec);
    };



    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expireDate");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresIn");
        setState(initialState);
      };



    const loginUser = (email, password) =>{
        setState({...state, logginIn : true});

        const data = {
            "email":email,
            "password":password,
            returnSecureToken:true
        }


        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzCkLgPzwj0E85YFz0GH6iEWBy2KbvsTI', data)
        .then((response) => {
            console.log(response.data.localId)
            const token = response.data.idToken;
            const userId = response.data.localId;
            const expiresIn = response.data.expiresIn;
            const expireDate = new Date(new Date().getTime() + expiresIn * 10000);
            const refreshToken = response.data.refreshToken;
            loginUserSuccess(token, userId, expiresIn, expireDate, refreshToken);        
          })
          .catch(function (error) {
            alert(error.message)
            setState({
                ...state,
                saving: false,
                token: null,
                userId: null,
                expiresIn: null,
                expireDate: null,
              });
          });
    }





    return (
        <UserContext.Provider value={{ state, loginUser, logOut, loginUserSuccess, autoRenewTokenAfterMillisec }}>
          {props.children}
        </UserContext.Provider>
      );


    

}
export default UserContext;