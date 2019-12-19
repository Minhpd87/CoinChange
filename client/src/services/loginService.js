import axios from "axios";

const baseURL = "/api/login";

const login = async credentials => {
  try {
    const response = await axios.post(baseURL, credentials);
    return response.data;
  } catch (error) {
    return "error";
  }
};

export default { login };
