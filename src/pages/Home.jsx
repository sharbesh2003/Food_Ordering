import { useContext, useState } from 'react';
import Categories from '../Category'
import Card from '../components/Card';
import Navbar from '../components/Navbar'
import { food_items } from '../Food';
import { dataContext } from '../context/UserContext';
import { MdCancel } from "react-icons/md";
import Card2 from '../components/Card2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Home() {

  let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext)

  function handelCate(category) {
    console.log(category)
    if (category === "All") {
      setCate(food_items);
    } else {
      let newList = food_items.filter((item) => (item.food_category === category))
      setCate(newList);
    }
  }

  let items = useSelector((state) => state.cart);

  let subTotal = items.reduce((total, item) => total + item.qty * item.price, 0);
  let deliveryFee = 20;
  let taxes = subTotal * 0.5 / 100;
  let total = Math.floor(subTotal + deliveryFee + taxes);


  return (
    <>
      <div className='bg-slate-200 w-full min-h-screen'>
        <Navbar />

        {/* Category */}
        {!input ? <div className='flex flex-wrap justify-center items-center gap-5 mt-5 p-[20px] '>
          {Categories.map((item) => {
            return (
              <div key={item.id} className="w-[120px] sm:w-[130px] md:w-[150px] h-[140px] md:h-[160px]  flex flex-col items-center justify-center gap-3 p-3 rounded-lg shadow-md bg-white hover:bg-red-100 cursor-pointer transition-all duration-200 hover:scale-105" onClick={() => handelCate(item.name)}>

                <img src={item.image} alt={item.name} className="w-[65px] h-[65px] md:w-[70px] md:h-[70px] object-contain" />
                <p className="text-sm md:text-base font-semibold text-gray-600 text-center">{item.name}</p>
              </div>
            );
          })}
        </div> : null}

        <div className='w-full flex flex-wrap gap-5 px-7 py-5 justify-center '>
          {cate.length>1?cate.map((item) => (
            <Card key={item.id} name={item.food_name} image={item.food_image} price={item.price} id={item.price} type={item.food_type} />
          )): <div className='text-center text-2x font-semibold' >no dish found</div> }
        </div>
      </div>

      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shoadow-xl p-5 transition-all duration-500 flex flex-col justify-items-center overflow-auto  ${showCart ? 'translate-x-0' : 'translate-x-full'}  `}  >
        <header className='w-[100%] flex justify-between items-center ' >
          <span className='text-red-700 text-[18px] font-semibold  '>Order Items</span>
          <MdCancel className='w-[25px] h-[25px]  text-black text-[25px] font-semibold cursor-pointer hover:text-gray-700  ' onClick={() => setShowCart(!showCart)} />
        </header>

        {items.length > 0 ?
          <>
            <div className='w-full h-[300px] flex flex-col justify-start items-center gap-2 mt-5 overflow-y-scroll '>
              {items.length > 0 ? items.map((item) => <Card2 key={item.id} name={item.name} price={item.price} image={item.image} qty={item.qty} id={item.id} />) : <div className='w-full h-[100px] flex flex-col justify-center items-center gap-2 '>
                <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="empty" className='w-[80px] h-[80px] object-contain' />
                <p className='text-gray-500 text-[18px] font-semibold '>Your cart is empty</p>
              </div>
              }
            </div>
            <div className="w-full border-t-2 border-b-2 border-gray-600 my-4 flex flex-col gap-2 p-8 ">
              <div className='w-full flex justify-between items-center' >
                <span className='text-lg text-gray-800 font-semibold' >SubTotal</span>
                <span className='text-md text-gray-800 font-semibold' >₹ {subTotal}/-</span>
              </div>
              <div className='w-full flex justify-between items-center' >
                <span className='text-lg text-gray-800 font-semibold' >Delivery Fee</span>
                <span className='text-md text-gray-800 font-semibold' >₹ {deliveryFee}/-</span>
              </div>
              <div className='w-full flex justify-between items-center' >
                <span className='text-lg text-gray-800 font-semibold' >Taxes</span>
                <span className='text-md text-gray-800 font-semibold' >₹ {taxes}/-</span>
              </div>
            </div>
            <div className='w-[80%] flex justify-between items-center p-5' >
              <span className='text-xl text-gray-800 font-semibold' >Total</span>
              <span className='text-md text-gray-800 font-semibold' >₹ {total}/-</span>
            </div>
            <button className="w-full p-2 md:p-3 rounded-lg bg-green-300 text-gray-800 hover:bg-green-500 transition-all" onClick={()=>{toast.success(" Order Placed")}} >Place Order</button>
          </> :
           <div className='text-center text-2xl text-red-500 font-semibold ' >Empty Cart</div>}


      </div>
    </>
  )
}

export default Home