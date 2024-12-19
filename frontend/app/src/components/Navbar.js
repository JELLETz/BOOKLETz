import { useState, useEffect } from "react";
import "../font.css";
import { useNavigate } from "react-router-dom";
import config from "../config";
import axios from "axios";
import Swal from "sweetalert2";

import logoimg from "../images/logo.png";

function Navbar({ getUserName, getUserRole }) {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSign = () => {
    navigate("/");
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/user/info",
        config.headers()
      ); // แปะ header ไปเพื่อการ authen ตัวเอง
      if (res.data.result !== undefined) {
        setUser(res.data.result);
        setShow(true);
        getUserName(res.data.result.username);
        getUserRole(res.data.result.role);
      } else {
        setShow(false);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const button = await Swal.fire({
        title: "ออกจากระบบ",
        text: "ยืนยันการออกจากระบบ",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <>
  <div className="flex justify-between items-center bg-gray-100 border-b-2 border-slate-200 relative">
    <div className="my-4 mx-10 text-xl flex">
      <img src={logoimg} className="h-8" alt="logo" />
      BOOKLETz
    </div>
    <div className="my-4 mx-10 kanit-extralight flex relative">
      <div className="mr-6 mt-2">สถานะ : {user.role}</div>
      {show ? (
        <div className="relative">
          <button
            className="bg-gray-100 hover:bg-gray-500 hover:text-white rounded-lg p-2"
            onClick={handleDropDown}
          >
            <i className="fa fa-user mr-2" />
            {user.username}
          </button>
          {dropDown && (
            <div className="absolute bg-gray-100 shadow-lg rounded-lg mt-2 right-0 w-full">
              <button
                className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-2 w-full"
                onClick={handleSignOut}
              >
                <i className="fa-solid fa-right-from-bracket mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-gray-100 hover:bg-gray-500 hover:text-white rounded-lg p-2"
          onClick={handleSign}
        >
          <i className="fa fa-user mr-2" />
          เข้าสู่ระบบ
        </button>
      )}
    </div>
  </div>
</>

  );
}

export default Navbar;
