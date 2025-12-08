import axios, { AxiosError } from "axios";
import api from "../utils/api";
import { useEffect } from "react";

const LoginPage = () => {
  const login = async () => {
    try {
      const { data } = await api.post(
        "/auth/login",
        {
          email: "test@gmail.com",
          password: "test@123",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log("LoginPageError: ", (error as AxiosError)?.response?.data);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <div>LoginPage</div>;
};

export default LoginPage;
