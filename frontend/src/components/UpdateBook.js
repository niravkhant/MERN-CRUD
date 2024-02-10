'use client'
import { fetchData } from '@/utils/useFetch';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function UpdateBook() {
  const router = useRouter();
  const formfield = {
    width: "500px",
    padding: "10px",
    margin: "auto",
    borderRadius: "7px",
    border: "1px solid black",
  };
  const [bookData, setBookData] = useState({
    bookName: "",
    author: "",
    bookDescription: "",
    price: "",
    bookLanguage: "",
  });
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setBookData({...bookData, [name]:value})
  }
  const {slug} = useParams();

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData(`books/${slug}`);
        setBookData(data);
      } catch (error) {
        console.log("Error in fetchDataAndSetState",error);
      }
    };

    fetchDataAndSetState();
  }, [slug]);

  const handleUpdate = async (e)=>{
    e.preventDefault();
   try {
    const res = await axios.put(`http://localhost:8000/api/updatebook/${slug}`, bookData)
    console.log(res.data);
    setBookData({
        bookName: "",
        author: "",
        bookDescription: "",
        price: "",
        bookLanguage: "",
    })
    router.push("/books")
   } catch (error) {
    console.error("Error 410: Frontend form submit", error);
   } 
  }
  return (
      <div>
      <fieldset style={formfield}>
        <legend>Update Book</legend>
        <tr>
          <td>Book Name</td>
          <td>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="bookName"
              value={bookData.bookName}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Author</td>
          <td>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Book Description</td>
          <td>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="bookDescription"
              value={bookData.bookDescription}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Price</td>
          <td>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Language</td>
          <td>
            <input
              type="text"
              name="bookLanguage"
              value={bookData.bookLanguage}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} align="center" className="mt-5">
            <input
              type="button"
              value="Update Book"
              name="updateBook"
              onClick={handleUpdate}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            />
          </td>
        </tr>
      </fieldset>
    </div>
  )
}

export default UpdateBook