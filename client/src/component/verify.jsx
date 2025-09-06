import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Verify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/verify", {email, otp });
      alert(res.data.message);
      navigate("/user")
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    }
  };

  return (


    <div className="main bg-[#142434] h-screen w-full fixed">

      <form onSubmit={handleSubmit}className="grid grid-cols-1 gap-2 w-full max-w-xl mx-auto p-4 bg-[#343c4c] mt-20 rounded-md text-white">
        <h2 className="text-center font-serif text-xl mt-5">Verify Email</h2>

        <div className="Password pb-3 pt-5 text-center">
          <label>

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  className='p-3 rounded-md w-2/3 border-2 border-gray-300 border-opacity-50 
            outline-none peer bg-inherit dark:text-white text-black' />

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

            <input type="text"value={otp} onChange={(e) => setOtp(e.target.value)} required className='p-3 rounded-md w-2/3 border-2 border-gray-300 border-opacity-50 
            outline-none focus:border-green peer bg-inherit dark:text-white text-black' />

            <span className='w-24 text-lg text-slate-400 left-1/4 right-1/2 mt-2.5 tracking-wide
                                peer-focus:text-sm peer-focus:-translate-y-5
                                text-opacity-80 absolute transition duration-200 input-text bg-[#343c4c]
                                 ml-48 mr-32 peer-vaild:text-sm peer-valid:-translate-y-5'>
              OTP
            </span>
          </label>
        </div>

        <button type="submit" className="mt-7 bg-[#020304] py-3 mx-[87px] rounded-md">Verify</button>
      
      </form>


    </div>



    
  );
};

export default Verify;
