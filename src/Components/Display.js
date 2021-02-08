import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import setAuthToken,{getDetails} from "../utils/setAuthToken";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
const Display = () => {
  const history = useHistory();
  const [isAdmin,setIsAdmin] =useState(false);
  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalRecords, setTotalRecords] = useState(0);


  useEffect(() => {
   
    if (localStorage.getItem("token") === null) {
      history.push("/");
      return;
    }
    const myToken =  getDetails(localStorage.getItem("token"))
    const userDetails = myToken.user;
    const admin =userDetails.userType;
    const id =userDetails.id;
  //   const {user} =  getDetails(localStorage.getItem("token"))
  // const {userType:admin,id} = user;

  setIsAdmin(admin);
  if(admin){
    loadUsers();
  }else{
    history.push(`/user/${id}`); 
  }
   // eslint-disable-next-line
  }, []); //[] is for runiing only 1 time


  const loadUsers = async (_page = page, _limit = pageSize) => {
    setAuthToken(); //  Important set token  from res.data to get token

       const result = await axios.get("http://localhost:4000/api/display", {
      params: {
        page: _page,
        limit: _limit
      }
    });
    console.log("resultaaaaa", result);
    const { total_records, user } = result.data;
    setUser(user);
    setTotalRecords(total_records);

  };

  const onChange = (pageNumber, size) => {
    loadUsers(pageNumber, size);
    setPage(pageNumber);
    setPageSize(size);
  };


  return (
    <div className="container">

      <div className="py-4">
        <h1>All Users Page !</h1>


        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone_No</th>
              <th scope="col">gender</th>
              <th scope="col">dob</th>
              <th>Action</th>
              <th>       <Link to='/reg'>
                <button className='btn btn-primary' type='button'>
                  Add User
									</button>
              </Link>
              </th>
            </tr>

          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.First_Name} </td>
                <td>{user.Last_Name} </td>
                <td>{user.Email} </td>
                <td>{user.Phone_No} </td>
                <td>{user.Gender} </td>

                <td>{new Date(user.DOB).toString().split(" ").slice(1, 4).join(" ")}</td>

                <td>
                  <Link className="btn btn-primary  mr-2" to={`/user/${user._id}`}> View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <br />
        <br />


        <div class="text-center">
          <button type="button" onClick={() => {
            localStorage.removeItem("token");
            history.push("/");
          }} class="btn btn-success">Logout </button>
        </div>
        <div>
          <Pagination
            //pageSizeOptions={[10, 20, 50]}
               current={page}
            total={totalRecords}
            pageSize={pageSize}
            onChange={onChange} />

        </div>

      </div>
    </div>
  );
};

export default Display;
