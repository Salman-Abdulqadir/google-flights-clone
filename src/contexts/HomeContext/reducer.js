import { ACTION_TYPES } from "./actions";

export const initialValues = {
  flightOrigin: null,
  flightDestination: null,
  flightStartDate: null,
  flightReturnDate: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FLIGHT_ORIGIN_VALUE:
      return { ...state, flightOrigin: action.payload };
    case ACTION_TYPES.SET_FLIGHT_DESTINATION_VALUE:
      return { ...state, flightDestination: action.payload };
    case ACTION_TYPES.SET_FLIGHT_START_DATE:
      return { ...state, flightStartDate: action.payload };
    case ACTION_TYPES.SET_FLIGHT_DESTINATION_VALUE:
      return { ...state, flightReturnDate: action.payload };
    default:
      return state;
  }
};
