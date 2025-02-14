import dayjs from "dayjs";

export const searchParamsToObject = (searchParams) => {
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const validateSearchParams = (params) => {
  const requiredParams = {
    originSkyId: "Please select a departure airport",
    destinationSkyId: "Please select a destination airport",
    date: "Please select a departure date",
    cabinClass: "Please select a cabin class",
    adults: "Please select number of passengers",
  };

  for (const [param, message] of Object.entries(requiredParams)) {
    if (!params[param]) {
      return { isValid: false, message };
    }
  }

  if (params.originSkyId === params.destinationSkyId) {
    return {
      isValid: false,
      message: "Departure and destination airports cannot be the same",
    };
  }

  return { isValid: true };
};

export const createSearchUrl = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });
  return `/flights?${searchParams.toString()}`;
};

export const createFlightDetailsUrl = (itinerary, params) => {
  const searchParams = new URLSearchParams();

  // Add all search params including itineraryId
  Object.entries({
    ...params,
    itineraryId: itinerary.id,
  }).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });

  // Get origin and destination codes
  const origin = itinerary.legs[0].origin.displayCode.toLowerCase();
  const destination = itinerary.legs[0].destination.displayCode.toLowerCase();

  return `/flights/${origin}-to-${destination}?${searchParams.toString()}`;
};

// Update validation for flight details params
export const validateFlightDetailsParams = (params) => {
  const requiredParams = {
    sessionId: "Session expired. Please search again.",
    itineraryId: "Invalid flight selection.",
    originSkyId: "Origin airport is required",
    destinationSkyId: "Destination airport is required",
    date: "Flight date is required",
    cabinClass: "Cabin class is required",
    adults: "Number of passengers is required",
  };

  for (const [param, message] of Object.entries(requiredParams)) {
    if (!params[param]) {
      return { isValid: false, message };
    }
  }

  return { isValid: true };
};
