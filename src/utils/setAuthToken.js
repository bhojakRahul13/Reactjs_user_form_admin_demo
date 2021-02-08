import axios from "axios";
import JwtDecode from "jwt-decode";
const setAuthToken = () => {
  const token = window.localStorage.getItem("token");
  console.log("Token get", token);
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;


export function getDetails (token){
  try{
   return   JwtDecode(token);
  }catch(e){
    console.error(e);
  }
}

