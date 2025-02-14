import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export class CatService {
  static async fetchCats(page: number, limit: number, filter: boolean) {
    try {
      const params = {
        limit,
        page,
        has_breeds: filter ? 1 : 0,
      };

      const response = await axios.get(`${BASE_URL}/v1/images/search`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cats:", error);
      throw error;
    }
  }
}
