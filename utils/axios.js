import Axios from "axios";

const AxiosCall = async (requestObj) => {
  const { path, method, data, contentType, version = "v1" } = requestObj;

  const token = localStorage.getItem("authToken");

  const headers = {
    Authorization: `Bearer ` + token,
    "Content-Type": contentType || "application/json",
  };

  const url = version ? `/api/${version}/${path}` : `${baseURL}${path}`;
  try {
    const response = await Axios({ method, url, data, headers, json: true });
    const result = response && response.data;

    return result;
  } catch (error) {
    console.log(error.response);
    if (error.response.data.status === 401) {
      localStorage.setItem("authToken", "");
      window.location.href = "/login";
    }
    throw error;
  }
};

export default AxiosCall;
