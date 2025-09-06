import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/register", formData);
      toast.success(res.data.message || "Registration successful!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark"
      });
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark"
      });
    }
  };


  return (
    <div className="main bg-[#142434] h-screen w-full fixed">

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 w-full max-w-xl mx-auto p-4 bg-[#343c4c] mt-20 rounded-md text-white">
        <h2 className="text-center font-serif te
        xt-xl mt-5">Register Form</h2>

        <div className="Password pb-3 pt-5 text-center">
          <label>

            <input type="email" name="email" onChange={handleChange} required className='p-3 rounded-md w-2/3 border-2 border-gray-300 border-opacity-50 
            outline-none focus:border-green peer bg-inherit dark:text-white text-black' />

            <span className='w-20 text-lg text-slate-400 left-[350px] right-1/2 mt-2.5 tracking-wide
                                peer-focus:text-sm peer-focus:-translate-y-5
                                text-opacity-80 absolute transition duration-200 input-text bg-[#343c4c]
                                 ml-48 peer-vaild:text-sm peer-valid:-translate-y-5'>
              Email
            </span>
          </label>
        </div>


        <div className="Password pb-3 pt-5 text-center">
          <label>

            <input type="password" name="password" onChange={handleChange} required className='p-3 rounded-md w-2/3 border-2 border-gray-300 border-opacity-50 
            outline-none focus:border-green peer bg-inherit dark:text-white text-black' />

            <span className='w-24 text-lg text-slate-400 left-1/4 right-1/2 mt-2.5 tracking-wide
                                peer-focus:text-sm peer-focus:-translate-y-5
                                text-opacity-80 absolute transition duration-200 input-text bg-[#343c4c]
                                 ml-48 mr-32 peer-vaild:text-sm peer-valid:-translate-y-5'>
              Password
            </span>
          </label>
        </div>

        <button type="submit" className="mt-7 bg-[#020304] py-3 mx-[87px] rounded-md">Register</button>

        
        <Link to={'/login'} className="mt-5 text-center mb-5">
          <p>Have an account?
            <a className="text-white" href="Login Here">Login Here</a>
          </p>
        </Link>
      </form>

    </div>
  );
};

export default Register;
