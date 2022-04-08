import axios from "axios";

export const createOrder = async (paylaod) =>
  await axios.post(`${process.env.REACT_APP_API_USER_ORDERS}`, { ...paylaod });

export const getOrders = async (emailId) =>
  await axios.get(
    `${process.env.REACT_APP_API_USER_ORDERS}?_sort=orderOn&userEmail=${emailId}&_order=desc`
  );

export const cancelOrder = async (orderId) =>
  await axios.delete(`${process.env.REACT_APP_API_USER_ORDERS}/${orderId}`);

export const updateOrder = async (orderId,orderUpdated) =>
  await axios.put(`${process.env.REACT_APP_API_USER_ORDERS}/${orderId}`,orderUpdated);
