import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";

const api = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com",
  validateStatus: (status) => {
    return status == 200;
  },
  headers: {
    "X-RapidAPI-Key": "d1b2632103mshc34e455e9b41b92p1b514bjsn43903e88ed59",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
});

const deezer = {
  getTops: async (limit: number = 10) => {
    try {
      return await deezer.getPlaylist("1111141961", limit);
    } catch (error) {
      //error
    }
  },
  getPlaylist: async (id: string, limit: number = 10) => {
    try {
      const { data } = await api.get(`playlist/${id}`, {
        params: {
          limit,
        },
      });

      return data;
    } catch (error) {
      //error
    }
  },
  search: async (q: string) => {
    try {
      const { data } = await api.get("search", {
        params: {
          q,
        },
      });

      return data;
    } catch (error) {
      //error
    }
  },
};

export { deezer };
