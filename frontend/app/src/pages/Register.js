import { useState } from "react";
import "../font.css";
import { useNavigate } from 'react-router-dom';
import config from "../config";
import axios from 'axios';
import Swal from "sweetalert2";

import logoimg from '../images/logo.png'

function Register() {

    const navigate = useNavigate();
    function backToSingIn(){
        navigate('/');
    }

    const [user, setUser] = useState({});

    const handleRegister = async() =>{
        try {
            const result = await axios.post(config.apiPath + '/user/create', user);
            if (result.data.message === 'success') {
                await Swal.fire({
                    title: 'สำเร็จ !',
                    text: 'สร้างสำเร็จ',
                    icon: 'success',
                    timer: 3000
                })
                navigate('/');
            }
        } catch (e) {
            Swal.fire({
                title: 'ไม่สำเร็จ',
                text: e.message,
                icon: 'error'
            })
        }
    }
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen kanit-extralight">
        <div className="flex">
                <div className="w-1/3">
                  <img src={logoimg} className="w-32" alt="logo"/>
                </div>
                <div className="mb-5 flex flex-col items-center justify-center w-2/3">
                  <span className="text-3xl font-semibold text-gray-800">
                    BOOKLETz
                  </span>
                  <p className="text-gray-500 mt-2">
                    เว็บไซต์จองห้องส่วนกลาง
                  </p>
                </div>
                </div>

        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <div className="w-full mb-4">
                <span className="text-gray-500 hover:text-gray-700 hover:border-b-2 border-gray-700 hover:cursor-pointer" onClick={backToSingIn}><i className="fa fa-arrow-left mr-2" />กลับสู่หน้า Login</span>
            </div>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            สมัครสมาชิก
          </h2>

          <div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
              >
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="กรุณากรอกชื่อผู้ใช้"
                onChange={e=> setUser({...user, username: e.target.value})}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
              >
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="กรุณากรอกรหัสผ่าน"
                onChange={e=> setUser({...user, password: e.target.value})}
                required
              />
            </div>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleRegister}
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
