
import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { DecrementQty, IncrementQty, RemoveItem } from '../redux/cartSlice';

function Card2({ name, image, price, qty, id }) {
  let dispatch = useDispatch();
  return (
    <>
      <div className="w-full p-3 shadow-md rounded-xl flex flex-col sm:flex-row justify-between gap-4 bg-white">
        <div className="flex gap-4 w-full sm:w-[70%]">
          <div className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] overflow-hidden rounded-lg flex-shrink-0">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="text-base sm:text-lg font-semibold text-gray-700">{name}</div>
            <div className="w-[110px] h-[40px] sm:h-[45px] flex rounded-lg overflow-hidden border border-green-400 text-lg">
              <button className="w-[30%] bg-white text-green-500 hover:bg-gray-200" onClick={()=>{qty>1?dispatch(DecrementQty(id)):1}} > - </button>
              <div className="w-[40%] flex items-center justify-center bg-gray-100 text-green-600">{qty}</div>
              <button className="w-[30%] bg-white text-green-500 hover:bg-gray-200" onClick={()=>{dispatch(IncrementQty(id))}} >+</button>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col justify-between sm:items-end items-center w-full sm:w-auto">
          <span className="text-lg sm:text-xl font-semibold text-green-500">₹{price}</span>
          <MdDelete className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 cursor-pointer hover:scale-110 transition " onClick={() => dispatch(RemoveItem(id))} />
        </div>
      </div>
    </>
  )
}

export default Card2