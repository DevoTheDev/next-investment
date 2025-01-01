import axios from 'axios';

export const BASE_URL = process.env.NEXT_INVESTMENT_API_BASE_URL || 'http://localhost:7007';

export const investorController = () => {
  // Function to get the user token from local storage
  const getUserToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  // Function to fetch all investments or a specific investment by ID
  const getInvestments = async (investmentId: string 
    | undefined): Promise<any> => {
    try {
      const token = getUserToken();
      if (!token) throw { message: 'Authentication token not found' };

      const url = investmentId
        ? `${BASE_URL}/investments/${investmentId}`
        : `${BASE_URL}/investments`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch investments' };
    }
  };

  // Function to add a new investment
  const addInvestment = async (investmentData: {
    ticker: string;
    shares: number;
    purchasePrice: number;
    currentValue?: number;
  }): Promise<any> => {
    try {
      const token = getUserToken();
      if (!token) throw { message: 'Authentication token not found' };

      const response = await axios.post(`${BASE_URL}/invest`, investmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to add investment' };
    }
  };

  // Function to update an existing investment
  const updateInvestment = async (
    investmentId: string,
    investmentData: {
      ticker: string;
      shares: number;
      purchase_price: number;
      current_value?: number;
    }
  ): Promise<any> => {
    try {
      const token = getUserToken();
      if (!token) throw { message: 'Authentication token not found' };

      const response = await axios.put(
        `${BASE_URL}/investment/${investmentId}`,
        investmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update investment' };
    }
  };

  // Function to delete an investment
  const deleteInvestment = async (investmentId: string): Promise<any> => {
    try {
      const token = getUserToken();
      if (!token) throw { message: 'Authentication token not found' };

      const response = await axios.delete(`${BASE_URL}/divest/${investmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete investment' };
    }
  };

  return { getUserToken, getInvestments, addInvestment, updateInvestment, deleteInvestment };
};
