import dayjs from 'dayjs';

export const searchParamsToObject = (searchParams) => {
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const validateSearchParams = (params) => {
  const requiredParams = {
    originSkyId: 'Please select a departure airport',
    destinationSkyId: 'Please select a destination airport',
    date: 'Please select a departure date',
    cabinClass: 'Please select a cabin class',
    adults: 'Please select number of passengers'
  };

  for (const [param, message] of Object.entries(requiredParams)) {
    if (!params[param]) {
      return { isValid: false, message };
    }
  }

  if (params.originSkyId === params.destinationSkyId) {
    return { 
      isValid: false, 
      message: 'Departure and destination airports cannot be the same' 
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