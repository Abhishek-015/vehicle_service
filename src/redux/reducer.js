import {
  LOGGED_IN_USER,
  LOGOUT,
  SERVICE_DATA,
  SEARCH_QUERY,
  FILTER_SERVICES_BY_LOCATION,
  SERVICE_VIEW,
  USER_CART,
  USER_ORDERS,
  GET_CART
} from "./actionTypes";

let initialState = {
  serviceData: [],
  filterServicesByLocation: [],
  userDetails: {},
  serviceView: {},
  searchQuery: "",
  userCart:[],
  userOrders:[]
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
    case SERVICE_VIEW:
      return { ...state, serviceView: payload };
    case USER_CART:
      return { ...state, userCart: payload };
    case USER_ORDERS:
      return { ...state, userOrders: payload };
    case GET_CART:
      return { ...state, userCart: [...state.userCart] };
    default:
      return state;
  }
};
