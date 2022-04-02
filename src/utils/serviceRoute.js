import axios from "axios";

export const getServices = async () =>
  await axios.get(`${process.env.REACT_APP_API}`);

export const getServicesByCount = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}?_page=${page}&_limit=3`);



export const createService = async (paylaod) => {
  await axios.post(`${process.env.REACT_APP_API}`, { ...paylaod });
};

export const deleteService = async (serviceId) =>
  await axios.delete(`${process.env.REACT_APP_API}/${serviceId}`);

//   export const updateService = async (paylaod) => {
//     await axios.post(`${process.env.REACT_APP_API}`, { ...paylaod });
//   };
