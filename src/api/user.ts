import { User } from "model/user";
import { api } from "./api";

const signup = async (email: string, username: string, password: string): Promise<User> => {
  const response = await api.post("/user/signup", {
    username,
    email,
    password,
  });
  return response.data as User;
};

const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/user/login", {
    email,
    password,
  });
  return response.data as User;
};

const logout = async (): Promise<void> => {
  await api.post("/user/logout");
};

const me = async (): Promise<User> => {
  const response = await api.get("/user/me");
  return response.data as User;
};

export default {
  signup,
  login,
  logout,
  me,
};
