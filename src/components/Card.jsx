import { LuSquareDot } from "react-icons/lu";
import { FaCaretSquareUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { toast } from "react-toastify";

function Card({ name, image, price, type,category, id }) {

  let dispatch = useDispatch();

  return (
    <div className="w-[260px] sm:w-[280px] md:w-[300px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:scale-105 transition-all duration-200 ">

      <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="w-full h-full object-cover"/>
      </div>

      <div className="text-lg md:text-xl font-semibold">
        {name}
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="text-base md:text-lg font-bold text-black">₹ {price}</div>

        <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
          {type === "veg" ? (
            <LuSquareDot className="text-green-600 w-[18px] h-[18px]" />) : (<FaCaretSquareUp className="text-red-600 w-[18px] h-[18px]" />)}
          <span className={type === "veg" ? "text-green-600" : "text-red-600"}>{type}</span>
        </div>

      </div>

      <button className="w-full p-2 md:p-3 rounded-lg bg-green-300 text-gray-800 hover:bg-green-500 transition-all" onClick={()=>{dispatch(AddItem({id:id, name:name, price:price, image:image, qty:1 })); toast.success("Added to cart") }}  >Add to Cart</button>

    </div>
  );
}

export default Card;