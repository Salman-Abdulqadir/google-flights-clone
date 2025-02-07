import dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  skyScrapperApiBaseUrl: process.env.SKY_SCRAPPER_API_BASE_URL,
  skyScrapperApiKey: process.env.SKY_SCRAPPER_KEY,
};

export default AppConfig;
