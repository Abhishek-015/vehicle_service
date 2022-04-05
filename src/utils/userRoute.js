import axios from "axios";

export const createOrder = async (paylaod) =>
  await axios.post(`${process.env.REACT_APP_API_USER_ORDERS}`, { ...paylaod });

export const getOrders = async (emailId) =>
  await axios.get(
    `${process.env.REACT_APP_API_USER_ORDERS}?_sort=orderOn,${emailId}&_order=desc`
  );
