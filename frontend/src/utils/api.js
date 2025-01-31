import axios from "axios";

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

export const loginUser=async(email,password)=>{
  try{
    const res=await axios.post('/api/user/login',{email,password});
    console.log(res.data);
    return res.data;
  } catch(error){
    console.log(error.response?.data || error.message)
    throw error;
  }
}