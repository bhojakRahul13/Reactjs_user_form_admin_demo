import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const Register = () => {

  //store 18+ age 
  const d = new Date();
  const dateAge = d.setFullYear(d.getFullYear() - 18);


  let history = useHistory();
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_No, setPhone_No] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [languages, setLanguages] = useState([
    { id: 1, value: 'Hindi', isChecked: false },
    { id: 2, value: 'Gujarati', isChecked: false },
    { id: 3, value: 'English', isChecked: false }
  ]);
  const [profile, setProfile] = useState(null); //to store image
  const [data, setData] = useState(""); //TO Store data message
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (e) => {
    //e.preventDefault();
    try {

      console.log("imag", profile);

      var formData = new FormData();
      formData.append("First_Name", first_Name);
      formData.append("Last_Name", last_Name,);
      formData.append("Email", email);
      formData.append("Password", password);
      formData.append("Phone_No", phone_No);
      formData.append("DOB", dob);
      formData.append("Gender", gender);



      formData.append("Profile", profile);

      let language = [];
      languages.map(lang => {
        if (lang.isChecked) language.push(lang.value);
      });
      formData.append("Language", language);

      console.log("abbc", typeof formData.get("Language"));

      const res = await axios.post("http://localhost:4000/api/sign-up", formData
      );
      console.log("res", res);


      history.push("/");
    } catch (error) {
      if (error.response) {
        setData(error.response.data.msg);
      } else {
        setData(error.message);
      }
      console.log("error", error);
    }
  };

  console.log("profile", profile);


  //check box  function
  function handleCheckboxChecked(event) {
    let language = languages;
    language.forEach((lang) => {
      if (lang.value === event.target.value)
        lang.isChecked = event.target.checked;
    });
    console.log(JSON.stringify(language, null, 2));
    setLanguages(language);
  }

  console.log("image", profile);

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Register Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data" >

          <div className="form-group">
            <input
              type="text"
              name="first_name"
              className="form-control form-control-lg"
              placeholder="First_Name"
              value={first_Name}
              onChange={(e) => setFirst_Name(e.target.value)}
              ref={register({ required: true })}
            />
            {errors.first_name && <p>"first_name Is  required"</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="last_name"
              className="form-control form-control-lg"
              placeholder="Last_name"
              value={last_Name}
              ref={register({ required: true })}
              onChange={(e) => setLast_Name(e.target.value)}
            />
            {errors.last_name && <p>"last_name Is  required"</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              value={email}
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>"Email Is  required"</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              name="Password"
              placeholder="Enter Your Passord"
              value={password}
              ref={register({ required: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.Password && <p>"password Is  required"</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="Phone_No"
              placeholder="Enter Your Phone Number"
              value={phone_No}
              onChange={(e) => setPhone_No(e.target.value)}
              ref={register({ required: true })}
            />
            {errors.Phone_No && <p>"Phone_No Is  required"</p>}
          </div>

          <div className="form-group">

            <DatePicker
              selected={dob}
              onChange={date => setDob(date)}
              disabledKeyboardNavigation
              dateFormat="yyyy/MM/dd"
              maxDate={dateAge}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              monthsShown={2}
              isClearable
              placeholderText="I have been cleared!"
            />
          </div>

          <div>
            <select className='form-group' name="gender" value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value='male'>male</option>
              <option value='female'>female</option>
            </select>

          </div>

          <div>
            {
              languages.map((language) => {
                return (
                  <li type="none" key={language.id}>
                    <input type="checkbox" name={language.value} value={language.value}
                      onChange={(handleCheckboxChecked)} />
                    <label htmlFor={language.value} className="ml-2">{language.value}</label>
                  </li>
                );
              })
            }
          </div>

          <div className="form-group">
            <input type="file"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
              placeholder="Plz add Image File" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <h1>{data}</h1>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

