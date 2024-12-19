import React, { useState } from 'react';

const Form = () => {

  const rooms = ['Room 101', 'Room 102', 'Room 103'];

  return (
    <div className='my-4 mx-10 kanit-extralight'>
      <div className='mb-4'>
        <label>วันที่ต้องการจอง:</label>
        <input
          type='date'
          name='date'
          className='bg-gray-100 rounded-lg p-2 w-full'
        />
      </div>
      <div className='mb-4'>
      <label>เวลาที่เริ่ม:</label>
        <input
          type='time'
          name='startTime'
          className='bg-gray-100 rounded-lg p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <label>เวลาที่สิ้นสุด:</label>
        <input
          type='time'
          name='endTime'
          className='bg-gray-100 rounded-lg p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <label>ห้อง:</label>
        <select
          name='room'
          className='bg-gray-100 rounded-lg p-2 w-full'
        >
          <option value=''>-- เลือกห้อง --</option>
          {rooms.map((room, index) => (
            <option key={index} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
      >
        ส่งข้อมูลการจอง
      </button>
    </div>
  );
};

export default Form;
