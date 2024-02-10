import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    console.log("Data Successfully Fetched with:", `${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in client: ${BASE_URL}/${endpoint}`, error);
    throw error; // Re-throw the error so that the caller can handle it if needed
  }
};
