import axios from "axios";
import AppConfig from "../utils/config";
import { useQuery } from "@tanstack/react-query";

// Fetch airport data from OurAirports (CSV converted to JSON)
export const fetchAirports = async () => {
  try {
    const response = await axios.get(AppConfig.ourAirportsApiBaseUrl);
    const text = response.data;

    // Convert CSV to JSON
    const rows = text.split("\n").map((row) => row.split(","));

    return rows.map((row) => ({
      id: row[0],
      name: row[1]?.replace(/"/g, ""),
      city: row[2]?.replace(/"/g, ""),
      country: row[3]?.replace(/"/g, ""),
      iata: row[4]?.replace(/"/g, ""),
    }));
  } catch (e) {
    console.error("Something went wrong while getting airport data");
  }
};

export const useAirports = () => {
  return useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};
