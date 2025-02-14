import React, { useState } from "react";

const useApi = ({ method }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const invokeMethod = async (...methodArgs) => {
    try {
      setLoading(false);
      setError(false);
      const response = await method(...methodArgs);
      setData(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, invokeMethod };
};

export default useApi;
