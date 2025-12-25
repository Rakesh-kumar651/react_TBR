import axios from "axios";


const API_Login= "/auth/realms/EdgeBlox/protocol/openid-connect/token";

export const loginApi = async ({ email, password }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("client_id", "apigateway");
  formData.append("client_secret", "1hTCAbBF6wZrIrpwy8xXR4uVe36odFGd");
  formData.append("username", email);
  formData.append("password", password);

  const response = await axios.post(
    API_Login,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  return response.data;
};



