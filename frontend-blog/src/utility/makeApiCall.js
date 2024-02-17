import axios from "axios";
import { BASE_URL} from "./constants";

const makeApiCall = async (method, endpoint, formData, onSuccess, onError) => {
    try {
        const res = await axios({ method, url: `${BASE_URL}/${endpoint}`, data: formData });
        onSuccess(res.data);
      } catch (error) {
        onError(error);
      }
  };

export default makeApiCall;