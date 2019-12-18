import axios from "axios";

const baseURL = "/api/dateData";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const remove = async id => {
  await axios.delete(`${baseURL}/${id}`);
  return;
};

const create = async data => {
  const response = await axios.post(baseURL, data);
  return response.data;
};

// const update = async (id, data) => {
//   const response = await axios.put(`${baseURL}/${id}`, data);
//   return response.data;
// };

export default { getAll, remove, create };
