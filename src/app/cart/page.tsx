"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartData, setCartData] = useState([]);

  //FETCHING USER CART DATA ON PAGE LOAD
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/users/cart");
        setCartData(response.data.data);
      } catch (error: any) {
        console.log("CART PAGE ERROR: ", error.message);
      }
    };
    getData();
    console.log("IN CART: ", cartData);
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="w-full p-4 border-b">
        <Link href="/">
          <h1 className="uppercase text-xl tracking-widest">Shopaholic</h1>
        </Link>
      </nav>

      <div className="p-6">
        <h1 className="uppercase text-2xl tracking-widest text-center pb-8">
          Your Cart
        </h1>

        <div className="page_result">
          {cartData.length == 0 ? (
            <h1>Currently Empty..</h1>
          ) : (
            <div className="cart-conatiner flex flex-col gap-4 justify-center items-center">
              {cartData.map((item) => (
                <div key={item.product_id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={item.product_photo} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.product_name}</h5>
                    <div className="flex">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.prices}</p>
                    <p className="mb-3 pl-5 font-normal text-gray-700 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                </div>
            </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
