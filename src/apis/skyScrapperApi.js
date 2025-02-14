import AppConfig from "../utils/config";
import axios from "axios";

export class SkyScrapperApi {
  static baseUrlV1 = `${AppConfig.skyScrapperApiBaseUrl}/v1/flights`;
  static baseUrlV2 = `${AppConfig.skyScrapperApiBaseUrl}/v2/flights`;
  static config = {
    headers: {
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      "x-rapidapi-key": AppConfig.skyScrapperApiKey,
    },
  };

  static async searchAirports(query) {
    try {
      const url = `${this.baseUrlV1}/searchAirport`;
      const params = { query, locale: "en-US" };
      const response = await axios.get(url, { ...this.config, params });

      return response?.data?.status
        ? response.data?.data?.filter(
            (item) => item?.navigation?.entityType === "AIRPORT"
          )
        : [];
    } catch (e) {
      console.error("Something went wrong while searching airports - ", e);
    }
  }
  static async searchFlights(params) {
    try {
      const url = `${this.baseUrlV2}/searchFlights`;
      const response = await axios.get(url, { ...this.config, params });
      if (!response.data.status) {
        throw new Error("Failed to fetch flights");
      }
      return response.data;
    } catch (e) {
      console.error("Something went wrong while searching flights - ", e);
      throw e;
    }
  }
  static async getFlightDetails(params) {
    try {
      const url = `${this.baseUrlV1}/getFlightDetails`;
      const response = await axios.get(url, {
        ...this.config,
        params: {
          itineraryId: params.itineraryId,
          sessionId: params.sessionId,
          legs: JSON.stringify([
            {
              origin: params.originSkyId,
              destination: params.destinationSkyId,
              date: params.date,
            },
          ]),
          cabinClass: params.cabinClass,
          adults: params.adults,
          children: params.children,
          infants: params.infants,
          currency: params.currency,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
