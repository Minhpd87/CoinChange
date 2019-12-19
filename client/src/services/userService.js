import axios from "axios";

const baseURL = "/api/userData";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async newData => {
  const response = await axios.post(baseURL, newData);
  return response.data;
};

const remove = async id => {
  await axios.delete(`${baseURL}/${id}`);
};

const update = async (id, newData) => {
  const response = await axios.put(`${baseURL}/${id}`, newData);
  return response.data;
};

export default { getAll, create, remove, update };
