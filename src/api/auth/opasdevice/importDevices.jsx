import axios from "axios";

const API_BASE = "/api/api/opas/device";

export const importDevices = async ({ file, token }) => {
  const formData = new FormData();
  formData.append("zipFile", file); // 🔑 must match backend key

  const response = await axios.post(
    `${API_BASE}/import`,
    formData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // ❌ DO NOT set Content-Type manually
      }
    }
  );

  return response.data;
};
