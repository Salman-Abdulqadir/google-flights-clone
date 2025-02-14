export const ACTION_TYPES = {
  SET_FLIGHT_ORIGIN_VALUE: "@SET_FLIGHT_ORIGIN_VALUE",
  SET_FLIGHT_DESTINATION_VALUE: "@SET_FLIGHT_DESTINATION_VALUE",
  SET_FLIGHT_START_DATE: "@SET_FLIGHT_START_DATE",
  SET_FLIGHT_RETURN_DATE: "@SET_FLIGHT_RETURN_DATE",
};

export const HomeContextActions = {
  setFlightOrigin: (payload) => ({
    type: ACTION_TYPES.SET_FLIGHT_ORIGIN_VALUE,
    payload,
  }),
  setFlightDestination: (payload) => ({
    type: ACTION_TYPES.SET_FLIGHT_DESTINATION_VALUE,
    payload,
  }),
  setFlightStartDate: (payload) => ({
    type: ACTION_TYPES.SET_FLIGHT_START_DATE,
    payload,
  }),
  setFlightReturnDate: (payload) => ({
    type: ACTION_TYPES.SET_FLIGHT_RETURN_DATE,
    payload,
  }),
};
