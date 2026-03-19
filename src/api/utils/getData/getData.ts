import { fetchApi } from "@/api/utils/fetchApi/fetchApi";
import { getStrapiURL } from "@/api/utils/getStrapiUrl/getStrapiUrl";

const BASE_URL = getStrapiURL();
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getHomePage() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);
  return fetchApi(url.href, {
    method: "GET",
    authToken: STRAPI_API_TOKEN,
  });
}

export async function getPage(pageUrl: string) {
  const path = `/api/${pageUrl}`;
  const url = new URL(path, BASE_URL);
  return fetchApi(url.href, {
    method: "GET",
    authToken: STRAPI_API_TOKEN,
  });
}
