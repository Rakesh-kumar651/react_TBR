import axios from "axios";

export const loginApi = async ({ email, password }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("client_id", "apigateway");
  formData.append("client_secret", "LLrlleJgJC0EKI7ASzDZFRqIl28DmMp7");
  formData.append("username", email);
  formData.append("password", password);

  const response = await axios.post(
    "http://localhost:30080/realms/EdgeBlox/protocol/openid-connect/token",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  return response.data;
};