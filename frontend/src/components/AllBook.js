"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {fetchData} from "@/utils/useFetch"

function AllBook() {
  const [bookData, setBookData] = useState();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/books");
  //     setBookData(response.data);
  //   } catch (error) {
  //     console.error("Error in client:", error);
  //   }
  // };
  const fetchApi = async () => {
    const data = await fetchData("/books");
    setBookData(data);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const deleteBook = async(id)=>{
    axios.delete(`http://localhost:8000/api/deletebook/${id}`)
    fetchApi();
  }

  return (
    <div>
      <h3>All Books</h3>
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
          <th className="px-6 py-3">Book Name</th>
          <th className="px-6 py-3">Book Description</th>
          <th className="px-6 py-3">Book Price</th>
          <th className="px-6 py-3">Book Author</th>
          <th colSpan={2} className="px-6 py-3">Action</th>
        </tr>
       </thead>
       <tbody>

        {bookData?.map((item) => (
          <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.bookName} </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.bookDescription}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.price}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.author}</td>
            <td scope="row" className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white">
                <Link href={`/updatebook/${item._id}`}>Edit Book</Link>
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white">
                <Link href={`#`} onClick={()=>deleteBook(item._id)}>Delete Book</Link>
            </td>
          </tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>
  );
}

export default AllBook;
