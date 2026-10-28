
import axios from "axios";
import useAuth from "./useAuth";

type Auth = {
  token?: string;
};

const useAxiosSecure = () => {
  const { token } = useAuth() as Auth;
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return axiosSecure;
};

export default useAxiosSecure;
