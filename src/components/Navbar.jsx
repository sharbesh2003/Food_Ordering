import { useContext, useEffect } from "react";
import { BiLogoFlask } from "react-icons/bi";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { dataContext } from "../context/UserContext";
import { food_items } from "../Food";
import { useSelector } from "react-redux";

function Navbar() {
  let { input, setInput, cate, setCate, showCart, setShowCart } = useContext(dataContext)

  useEffect(() => {
    const search = input.toLowerCase().trim();
    const newList = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(search)
    );
    setCate(newList);
  }, [input]);

  let items = useSelector((state) => state.cart);
  console.log(items)

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white px-4 md:px-8 py-4 gap-4 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] flex justify-center items-center rounded-md shadow-md">
          <BiLogoFlask className="w-[30px] h-[30px] text-red-700" />
        </div>
        <h2 className="text-lg md:text-2xl font-medium">LookOut</h2>
      </div>

      <form className="w-full md:w-[45%] flex items-center px-4 py-2 gap-3 rounded-md shadow-md border focus-within:ring-2 focus-within:ring-red-400" onSubmit={(e) => e.preventDefault()}>

        <FaSearch className="text-gray-500 w-[16px] h-[16px]" />

        <input type="text" placeholder="Search Items..." className="w-full outline-none text-sm md:text-base" onChange={(e) => setInput(e.target.value)} value={input} />
      </form>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 cursor-pointer">
          <MdAccountCircle className="w-[35px] h-[35px] text-red-700" />
          <span className="text-sm hidden md:block">Sign In</span>
        </div>

        <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
          <FaShoppingCart className="w-[28px] h-[28px] text-red-700" />
          <span className="absolute -top-4 -right-2 bg-red-60 font-semibold ">{items.length}</span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;