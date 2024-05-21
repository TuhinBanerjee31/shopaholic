"use client";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  CreditCardIcon,
  KeyIcon,
  TruckIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import '../styles/globals.css';

export default function Home() {
  //TO STORE CATEGORY DATA
  const [category, setcategory] = useState([
    { name: "All Categories", id: "aps" },
    { name: "Fashion", id: "fashion" },
    { name: "Beauty", id: "beauty" },
    { name: "Books", id: "stripbooks" },
    { name: "Computers & Accessories", id: "computers" },
    { name: "Electronics", id: "electronics" },
    { name: "Furniture", id: "furniture" },
    { name: "Health & Personal Care", id: "hpc" },
    { name: "Home & Kitchen", id: "kitchen" },
    { name: "Industrial & Scientific", id: "industrial" },
    { name: "Jewellery", id: "jewelry" },
    { name: "Luggage & Bags", id: "luggage" },
    { name: "Luxury Beauty", id: "luxury-beauty" },
    { name: "Musical Instruments", id: "mi" },
    { name: "Shoes & Handbags", id: "shoes" },
    { name: "Sports, Fitness & Outdoors", id: "sporting" },
    { name: "Watches", id: "watches" },
  ]);
  const [activeProduct, setActiveProduct] = useState("aps");
  const [products, setProducts] = useState([]);
  // const [temp, setTemp] = useState({
  //   asin: "B088MWK2WQ",
  //   climate_pledge_friendly: false,
  //   currency: "INR",
  //   delivery:
  //     "FREE delivery Thu, 23 May on ₹299 of items fulfilled by AmazonOr fastest delivery Wed, 22 May",
  //   is_amazon_choice: false,
  //   is_best_seller: false,
  //   is_prime: true,
  //   product_minimum_offer_price: "₹269.40",
  //   product_num_offers: 1,
  //   product_num_ratings: 0,
  //   product_original_price: "₹317",
  //   product_photo:
  //     "https://m.media-amazon.com/images/I/613nYit4HcL._AC_SX444_SY639_FMwebp_QL65_.jpg",
  //   product_price: "₹269.40",
  //   product_star_rating: null,
  //   product_title: "Volitra APS 4% - Bottle of 30ml Solution",
  //   product_url: "https://www.amazon.in/dp/B088MWK2WQ",
  //   sales_volume: null,
  // });

  //SENDING TO DB
  const addCart = async (
    product_id,
    product_name,
    product_photo,
    prices,
    quantity
  ) => {
    try {
      const response = await axios.post("/api/users/cart", {
        product_id,
        product_name,
        product_photo,
        prices,
        quantity,
      });
      console.log("Added To Cart", response.data);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      //TODO: DISPLAY ERROR MESSAGE ON TOAST
    }
  };

  //INITIALISING ROUTER
  const router = useRouter();

  //FUNC FOR ENDING THE COOKIES SESSION
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout Successfull");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //FECTHING AND STORING PRODUCT DATA ON CATEGORY SELECT
  useEffect(() => {
    const getProducts = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/search",
        params: {
          query: activeProduct,
          page: "1",
          country: "IN",
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.data.products);
        setProducts(response.data.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [activeProduct]);

  return (
    <main className="min-h-screen">
      {/* NAV SECTION */}
      <div className="nav-container bg-nav-bg bg-cover bg-no-repeat md:min-h-[80vh]">
        {/* NAVBAR */}
        <nav className="navbar flex justify-between px-5 py-8">
          <div className="nav-left">
            <h1 className="uppercase text-xl tracking-widest">Shopaholic</h1>
          </div>

          <div className="nav-right flex gap-7">
            <Link href="/cart">
              <ShoppingCartIcon className="h-8 text-white cursor-pointer transform transition duration-300 hover:text-[#FB4E47]" />
            </Link>
            <UserIcon className="h-8 text-white cursor-pointer transform transition duration-300 hover:text-[#FB4E47]" />
            <button
              className="border px-3 rounded-lg transform transition duration-300 hover:text-[#FB4E47] hover:border-[#FB4E47]"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* SEARCHBAR */}
        <div className="searchbar w-full min-h-[50vh] flex justify-center items-center">
          <div className="searchbox flex justify-between w-3/4 md:w-2/5 bg-white rounded-3xl p-3 md:p-4">
            <input
              className="searchfield w-[80%] text-black bg-transparent outline-none border-none"
              placeholder="What are you looking for ?"
            />
            <MagnifyingGlassIcon className="size-6 text-black cursor-pointer transform transition duration-300 hover:scale-125 md:hover:scale-125" />
          </div>
        </div>
      </div>

      {/* PRODUCT */}
      <div className="min-h-screen pt-10 flex flex-col">
        <h1 className="uppercase text-2xl tracking-widest text-center pb-8">
          Products
        </h1>

        {/* CATEGORIES OPTIONS*/}
        <div className="w-full min-h-32 flex gap-4 justify-center items-center flex-wrap">
          {category.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveProduct(item.id)}
              className={`${
                item.id === activeProduct ? "border-[#FB4E47]" : ""
              } min-w-44 border-2 cursor-pointer rounded-md flex justify-center items-end transform transition duration-300 hover:scale-105 md:hover:scale-105`}
            >
              <h1
                className={`${
                  item.id === activeProduct ? "text-[#FB4E47]" : ""
                } py-2 text-sm sm:text-[1vw] p-2`}
              >
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        {products.length > 0 ? (
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 my-8">
            {products.map((item) => (
              // <div
              //   key={item.asin}
              //   className="w-3/5 md:w-1/5 flex flex-col p-4 justify-center"
              // >
              //   {/* PRODUCT PIC */}
              //   <div className="w-full relative">
              //     <Image
              //       src={item.product_photo}
              //       alt={item.product_url}
              //       height={100}
              //       width={0}
              //       layout="responsive"
              //       objectFit="contain"
              //     />
              //   </div>

              //   {/* HR LINE */}
              //   <div className="w-full border my-2"></div>

              //   {/* PRODUCT TITLE */}
              //   <h1 className="text-sm">{item.product_title}</h1>

              //   {/* REST INFO */}
              //   <div className="flex justify-between items-center py-3">
              //     <h3 className="text-xs">{item.product_price}</h3>
              //     <button
              //       onClick={() =>
              //         addCart(
              //           item.asin,
              //           item.product_title,
              //           item.product_photo,
              //           item.product_price,
              //           1
              //         )
              //       }
              //       className="text-xs border py-1 px-2 rounded-lg"
              //     >
              //       Add To Cart
              //     </button>
              //   </div>
              // </div>
              <div
                key={item.asin}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center"
              >
                <div>
                  <img
                    className="p-8 rounded-t-lg max-h-60"
                    src={item.product_photo}
                    alt={item.product_url}
                  />
                </div>
                <div className="px-5 pb-5">
                  <Link href={{pathname: "/search", query: {search: item.asin}}}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.product_title.slice(0,60)+"..."}
                    </h5>
                  </Link>
                  <div className="flex items-center mt-2.5 mb-5">
                    {/* <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div> */}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {item.product_star_rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.product_price}
                    </span>
                    <a
                      onClick={() =>
                        addCart(
                          item.asin,
                          item.product_title,
                          item.product_photo,
                          item.product_price,
                          1
                        )
                      }
                      className="text-white cursor-pointer bg-[#FB4E48] hover:bg-[#FB4E48] focus:ring-4 focus:outline-none focus:bg-[#FB4E48] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FB4E48] dark:hover:bg-[#FB4E48] dark:focus:bg-[#FB4E48]"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>Loading..</h1>
        )}
        
      </div>

      {/* MEMBERSHIP */}
      <div className="min-h-screen py-16">
        {/* TITLE */}
        <h1 className="uppercase text-2xl tracking-widest text-center pb-8">
          Membership
        </h1>

        <div className="mp-container w-full flex flex-col justify-center items-center">
          <div className="upper-half border-2 border-b-0 w-[98vw] h-[100vh] md:h-[60vh] flex flex-col md:flex-row justify-around items-center">
            <div className="h-full flex flex-col justify-center items-center">
              <CreditCardIcon className="h-1/3 w-auto text-[#F55450]" />
              <h1 className="text-lg font-bold tracking-widest uppercase text-[#F55450]">
                Big Discounts
              </h1>
            </div>

            <div className="h-full flex flex-col justify-center items-center">
              <KeyIcon className="h-1/3 w-auto text-[#F55450]" />
              <h1 className="text-lg font-bold tracking-widest uppercase text-[#F55450]">
                Early Access
              </h1>
            </div>

            <div className="h-full flex flex-col justify-center items-center">
              <TruckIcon className="h-1/3 w-auto text-[#F55450]" />
              <h1 className="text-lg font-bold tracking-widest uppercase text-[#F55450]">
                Priority Shipping
              </h1>
            </div>

            <div className="h-full flex flex-col justify-center items-center">
              <GiftIcon className="h-1/3 w-auto text-[#F55450]" />
              <h1 className="text-lg font-bold tracking-widest uppercase text-[#F55450]">
                Brithday Discounts
              </h1>
            </div>
          </div>

          <div className="lower-half w-[98vw] bg-[#F55450] h-[10vh] cursor-pointer flex justify-center items-center">
            <h1 className="uppercase tracking-widest font-bold text-3xl">
              Become a Member
            </h1>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <span className="self-center uppercase tracking-wider text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Shopaholic
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">
                      Flowbite
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a
                href="https://flowbite.com/"
                className="hover:underline uppercase tracking-wider"
              >
                Shopaholic
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
