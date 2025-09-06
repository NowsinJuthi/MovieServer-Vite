import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { RiPassExpiredLine } from "react-icons/ri";



const UserForm = () => {
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    startAt: '',
    expiresAt: '',
  });

  const onInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      startAt: startingDate,
      expiresAt: endingDate
    };

    try {
      await axios.post('/api/v1/user', finalData);
      alert('User created');

      setFormData({
        username: '',
        password: '',
        email: '',
        startAt: '',
        expiresAt: ''
      });
      setStartingDate(null);
      setEndingDate(null);
      navigate("/user-data");
    } catch (error) {
      console.error("Submit Error:", error.response?.data || error.message);
      alert("Failed to create user");
    }
  };

  return (
    <div className="main bg-[#121a24] h-screen w-full fixed">
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 w-full max-w-xl mx-auto p-4
       bg-[#343c4c] mt-20 rounded-md text-white">
        <div className="date grid grid-cols-12 gap-10">
          <div className="starting col-span-6">
            <h1 className="text-white ">Starting Date</h1>
            <DatePicker
              selected={startingDate}
              onChange={setStartingDate}
              dateFormat="MM/dd/yy"
              className="p-1 rounded-sm w-[247px] text-black"
            />
          </div>
          <div className="ending col-span-6">
            <h1 className="text-white">Ending Date</h1>
            <DatePicker
              selected={endingDate}
              onChange={setEndingDate}
              dateFormat="MM/dd/yy"
              className="p-1 rounded-sm w-[247px] text-black"
            />
          </div>
        </div>

        <div className="input-box grid grid-cols-1 gap-5 w-full max-w-xl mx-auto ">
          <input
            name="username"
            value={formData.username}
            onChange={onInputChange}
            placeholder="Username"
            className="p-2 rounded-md mt-7 text-black"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Password"
            className="p-2 rounded-md text-black"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Email Address"
            className="p-2 rounded-md text-black"
          />
        </div>

        <button type="submit" className="p-2 mt-10 text-slate-500 bg-white rounded-md">Submit</button>
      </form>




      <div className="button grid grid-cols-12 gap-2 mx-[428px]">

        <button className="grid col-span-6 group relative text-white bg-[#343c4c] mt-10 px-4 rounded items-center justify-center overflow-hidden w-full h-12">
          <Link to="/user-data" className="flex items-center space-x-2">
            <FaRegUserCircle
              className="text-2xl"/>
            <span className="">
              Show Users
            </span>
          </Link>
        </button>

        <button className="grid col-span-6 group relative text-white bg-[#343c4c] mt-10 px-4 rounded items-center justify-center overflow-hidden w-full h-12">
          <Link to="/expire-user" className="flex items-center space-x-2">
            <RiPassExpiredLine
              className="text-2xl"
            />
            <span className="">
              Expires Users
            </span>
          </Link>
        </button>
      </div>

    </div>
  );
};

export default UserForm;


