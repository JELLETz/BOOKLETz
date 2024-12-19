import { useState } from "react";
import "../font.css";
import config from "../config";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import logoimg from '../images/logo.png';
function SignIn() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
        const res = await axios.post( config.apiPath+ '/user/signIn', user);

        if (res.data.token !== undefined) {
            localStorage.setItem("token", res.data.token);
            navigate('/reservation');
        }
    } catch (e) {
        if (e.response.status === 401) {
            Swal.fire({
                title : 'Sign in',
                text : 'username or password is invalid',
                icon : 'warning'
            })
        } else {
            Swal.fire({
                title : 'error',
                text : e.message,
                icon : 'error'
            })
        }
    }
};


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
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            เข้าสู่ระบบ
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
                onChange={e=>setUser({...user, username:e.target.value})}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="กรุณากรอกชื่อผู้ใช้"
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
                onChange={e=>setUser({...user, password: e.target.value})}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="กรุณากรอกรหัสผ่าน"
                required
              />
            </div>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSignIn}
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <p className="text-sm text-center text-gray-600 mt-4">
            ยังไม่มีบัญชีผู้ใช้
            <a href="/register" className="text-blue-500 hover:underline ml-1">
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
