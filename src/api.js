import axios from "axios";

export default async function getImages(query, page) {
  const BASE_URL = "https://api.unsplash.com/";
  const endpoint = "/search/photos";
  const params = new URLSearchParams({
    query,
    client_id: "EHCNLl4TFox6GXcyfqcsUAoNkewaV3JBBTw-e4_oEiE",
    page,
  });
  const response = await axios.get(`${BASE_URL}${endpoint}?${params}`);
  return response.data;
}
