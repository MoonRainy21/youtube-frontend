import axios from "axios";
import "dotenv/config";
import totp from "totp-generator";

const axiosBackend = async (TOTP_SECRET: string) => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      "X-TOTP": totp(TOTP_SECRET),
    },
  });
  return axiosClient;
};

export default axiosBackend;
