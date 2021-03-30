import axios from "axios";

export const api = axios.create({
  baseURL: (window as any)._env_.API_HOST as string,
  withCredentials: true,
});
