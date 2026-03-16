import api from "../api/axios";

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};
