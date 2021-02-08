import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams,useHistory } from "react-router-dom";

const User = () => {
  const history = useHistory();
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_No, setPhone_No] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [languages, setLanguages] = useState([]);
  const [profile, setProfile] = useState(null); //to store image

  const { id } = useParams();


  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/api/user/${id}`);

    setFirst_Name(result.data.users.First_Name);
    setLast_Name(result.data.users.Last_Name);
    setEmail(result.data.users.Email);
    setPhone_No(result.data.users.Phone_No);
    setDob(result.data.users.DOB);
    setGender(result.data.users.Gender);
    setLanguages(result.data.users.Language);
    setProfile(result.data.users.Profile);

    console.log("result user", result);

  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/dis">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">first_name: {first_Name}</li>
        <li className="list-group-item">last_Name: {last_Name}</li>
        <li className="list-group-item">email: {email}</li>
        <li className="list-group-item">phone: {phone_No}</li>
        <li className="list-group-item">Dob: <td>{new Date(dob).toString().split(" ").slice(1, 4).join(" ")}</td>
        </li>
        <li className="list-group-item">Gender: {gender}</li>
        <li className="list-group-item">languages: {languages.join(",")}</li>

        <li className="list-group-item">Image: <img src={`http://localhost:4000/${profile}`} alt="profile pic" width="200px" height="200px" />

        </li>
      </ul>
      <div class="text-center">
          <button type="button" onClick={() => {
            localStorage.removeItem("token");
            history.push("/");
          }} class="btn btn-success">Logout </button>
        </div>
    </div>

  );
};

export default User;
