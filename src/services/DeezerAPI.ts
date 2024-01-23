import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";

//https://rapidapi.com/deezerdevs/api/deezer-1
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
  search: async (q: string, limit = 5) => {
    try {
      const { data } = await api.get("search", {
        params: {
          q,
          limit,
        },
      });

      return data;
    } catch (error) {
      //error
    }
  },
  searchPlaylist: async (q: string, limit = 10) => {
    const request = axios.create({
      baseURL: "https://api.deezer.com",
    });

    try {
      const { data } = await request.get(`search/playlist`, {
        params: { q, limit },
      });

      return data;
    } catch (error) {
      //error
      console.log("error load search playlist", error);
    }
  },
  searchAlbum: async (q: string, limit = 10) => {
    const request = axios.create({
      baseURL: "https://api.deezer.com",
    });

    try {
      const { data } = await request.get(`search/album`, {
        params: { q, limit },
      });

      return data;
    } catch (error) {
      //error
      console.log("error load search album", error);
    }
  },
  searchArtist: async (q: string, limit = 10) => {
    const request = axios.create({
      baseURL: "https://api.deezer.com",
    });

    try {
      const { data } = await request.get(`search/artist`, {
        params: { q, limit },
      });

      return data;
    } catch (error) {
      //error
      console.log("error load search album", error);
    }
  },
  getEditorialChart: async (genre: number = 0) => {
    try {
      const { data } = await api.get(
        `https://api.deezer.com/editorial/${genre}/charts`
      );

      return data;
    } catch (error) {
      //error
      console.log("error load editorial", error);
    }
  },
  getTops: async (limit: number = 10) => {
    try {
      return await deezer.getPlaylist("1111141961", limit);
    } catch (error) {
      //error
      console.log("error in load getTops", error);
    }
  },
  getPlaylist: async (id: string, limit: number = 50) => {
    try {
      const { data } = await api.get(`playlist/${id}`, {
        params: {
          limit,
        },
      });

      return data;
    } catch (error) {
      //error
      console.log("error load playlist", error);
    }
  },
  getArtist: async (id: string) => {
    try {
      const { data } = await api.get(`artist/${id}`);

      return data;
    } catch (error) {
      //error
      console.log("error load artist getArtist", error);
    }
  },
  getArtistTopTrack: async (id: string, limit = 50) => {
    const request = axios.create({
      baseURL: "https://api.deezer.com",
    });

    try {
      const { data } = await request.get(`artist/${id}/top?limit=${limit}`);

      return data;
    } catch (error) {
      //error
      console.log("error load track artist", error);
    }
  },
};

export { deezer };
