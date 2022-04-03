import {
  LOGGED_IN_USER,
  LOGOUT,
  SERVICE_DATA,
  SEARCH_QUERY,
  FILTER_SERVICES_BY_LOCATION,
} from "./actionTypes";

let initialState = {
  serviceData: [],
  filterServicesByLocation: [],
  userDetails: {},
  searchQuery: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGGED_IN_USER:
      return { ...state, userDetails: payload };
    case LOGOUT:
      return { ...state, userDetails: payload };
    case SERVICE_DATA:
      return { ...state, serviceData: payload };
    case SEARCH_QUERY:
      return { ...state, searchQuery: payload };
    case FILTER_SERVICES_BY_LOCATION:
      return { ...state, filterServicesByLocation: payload };
    default:
      return state;
  }
};
