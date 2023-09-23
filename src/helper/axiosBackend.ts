import axios from "axios";
import "dotenv/config";
import totp from "totp-generator";

const axiosBackend = async (TOTP_SECRET: string) => {
  // Check if TOTP_SECRET is base32
  if (!/^[A-Z2-7]+=*$/i.test(TOTP_SECRET)) {
    throw new Error("TOTP_SECRET must be base32");
  }

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
