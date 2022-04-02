import axios from "axios";

export const getServices = async () =>
  await axios.get(`${process.env.REACT_APP_API}`);

export const createService = async (paylaod) => {
  await axios.post(`${process.env.REACT_APP_API}`, { ...paylaod });
};

export const deleteService = async (serviceId) =>
  await axios.delete(`${process.env.REACT_APP_API}/${serviceId}`);

//   export const updateService = async (paylaod) => {
//     await axios.post(`${process.env.REACT_APP_API}`, { ...paylaod });
//   };
