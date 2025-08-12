import axios from "axios";

export const commonApi = async (httpRequest, url, reqBody, reqHeader) => {
  const config = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeader,
  };

  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
