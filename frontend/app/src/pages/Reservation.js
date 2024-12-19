import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

import "../font.css";

import config from "../config";

function Reservation() {
  const [booking, setBooking] = useState({});
  const [list, setList] = useState([]);
  const rooms = ["Room 101", "Room 102", "Room 103"];
  const [role, setRole] = useState(null);
  const [toDayDate, setTodayDate] = useState('');
  const [toDayTime, setTodayTime] = useState('');

  useEffect(() => {
    fetchData();
    getTodayDate();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/booking/list",
        config.headers()
      );

      if (res.data.results !== undefined) {
        setList(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const getName = (username) => {
    setBooking((prevBooking) => ({
      ...prevBooking, // เก็บค่าเดิมใน booking
      bookedBy: username, // เพิ่ม/อัปเดตค่าของ bookedBy
    }));
  };

  const getRole = (role) => {
    setRole(role);
  };

  const handleSubmit = async () => {
    try {
      if (!booking.roomName || (booking.endTime < booking.startTime) || (booking.date < toDayDate) || (booking.startTime < toDayTime)) {
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน",
          icon: "error",
          timer: 2000,
        });
        return;
      }
      const result = await axios.post(
        config.apiPath + "/booking/create",
        booking,
        config.headers()
      );
      if (result.data.message === "success") {
        Swal.fire({
          title: "saved",
          text: "success",
          icon: "success",
          timer: 2000,
        });
        await fetchData();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleRemove = async (item) => {
    try {
      const button = await Swal.fire({
        text: "remove item",
        title: "remove",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        const res = await axios.delete(
          config.apiPath + "/booking/remove/" + item.id,
          config.headers()
        );

        if (res.data.message === "success") {
          Swal.fire({
            text: "remove success",
            title: "remove",
            icon: "success",
            timer: 2000,
          });
        }
        fetchData();
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };  

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const hh = String(today.getHours()).padStart(2, "0");
    const min = String(today.getMinutes()).padStart(2, "0"); 
    setTodayDate(`${yyyy}-${mm}-${dd}`);
    setTodayTime(`${hh}:${min}`);
  };

  return (
    <>
      <Navbar getUserName={getName} getUserRole={getRole} />

      {booking.bookedBy !== undefined ? (
        <div className="w-full flex bg-white p-16">
          <div className="w-1/4 mr-10">
            <div className="my-4 mx-10 kanit-extralight">
              <div className="mb-4">
                <label>ผู้จอง:</label>
                <input
                  value={booking.bookedBy}
                  onChange={(e) =>
                    setBooking({ ...booking, bookedBy: e.target.value })
                  }
                  className="bg-gray-100 rounded-lg p-2 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label>วันที่ต้องการจอง:</label>
                <input
                  type="date"
                  value={booking.date}
                  onChange={(e) =>
                    setBooking({ ...booking, date: e.target.value })
                  }
                  className="bg-gray-100 rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label>เวลาที่เริ่ม:</label>
                <input
                  type="time"
                  value={booking.startTime}
                  onChange={(e) =>
                    setBooking({ ...booking, startTime: e.target.value })
                  }
                  className="bg-gray-100 rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label>เวลาที่สิ้นสุด:</label>
                <input
                  type="time"
                  value={booking.endTime}
                  onChange={(e) =>
                    setBooking({ ...booking, endTime: e.target.value })
                  }
                  className="bg-gray-100 rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label>ห้อง:</label>
                <select
                  className="bg-gray-100 rounded-lg p-2 w-full"
                  value={booking.roomName}
                  onChange={(e) =>
                    setBooking({ ...booking, roomName: e.target.value })
                  }
                >
                  <option value="">
                    --- เลือกห้อง ---
                  </option>
                  {rooms.map((room, index) => (
                    <option key={index} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                ส่งข้อมูลการจอง
              </button>
            </div>
          </div>

          <div className="w-3/4 bg-gray-100">
            <table class="table-auto border-collapse border border-gray-300 w-full text-sm kanit-extralight">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    ชื่อห้อง
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    วันที่จอง (ปี/เดือน/วัน)
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-center">
                    เวลาเริ่มต้น - สิ้นสุด
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    ชื่อผู้จอง
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-center">
                    ลบการจอง
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((item) => (
                    <tr key={item.id}>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.roomName}
                      </td>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.date}
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        {item.startTime}น. - {item.endTime}น.
                      </td>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.bookedBy}
                      </td>
                      {role === "admin" ||
                      booking.bookedBy === item.bookedBy ? (
                        <td class="border border-gray-300 px-4 py-2 text-center">
                          <button
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            title="ลบ"
                            onClick={(e) => handleRemove(item)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      ) : (
                        <td class="border border-gray-300 px-4 py-2 text-center">
                          ไม่มีสิทธิ์
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full flex-col bg-white p-8">
          <h1 className="mb-10 text-3xl">
            รายการจอง{" "}
            <span className="text-xl">(กรุณาเข้าสู่ระบบเพื่อทำการจอง)</span>
          </h1>
          <div className="bg-gray-100 w-full">
            <table class="table-auto border-collapse border border-gray-300 w-full text-sm kanit-extralight">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    ชื่อห้อง
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    วันที่จอง (ปี/เดือน/วัน)
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-center">
                    เวลาเริ่มต้น - สิ้นสุด
                  </th>
                  <th class="border border-gray-300 px-4 py-2 text-left">
                    ชื่อผู้จอง
                  </th>
                </tr>
              </thead>
              {list.length > 0
                ? list.map((item) => (
                    <tr key={item.id}>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.roomName}
                      </td>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.date}
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        {item.startTime} - {item.endTime}
                      </td>
                      <td class="border border-gray-300 px-4 py-2">
                        {item.bookedBy}
                      </td>
                    </tr>
                  ))
                : null}
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Reservation;
