import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const registerUser = async (formData) => {
  try {
    console.log("Sending request with:", formData);
    const fixedFormData = {
      ...formData,
      ...(formData.address && {
        address: {
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
        },
      }),
    };

    console.log("Fixed request data:", fixedFormData);

    const response = await axios.post("/api/user/register", fixedFormData);
    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const fetchDonors = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/donors`, { 
      params: {
        bloodGroup: filters.bloodGroup,
        city: filters.city,
        state: filters.state,
        country: filters.country,
      } 
    });

    if (response.data.success && response.data.donors) {
      return response.data.donors;
    } else {
      throw new Error("No donors found.");
    }
  } catch (error) {
    console.error("Error fetching donors:", error.response?.data || error.message);
    throw error;
  }
};
