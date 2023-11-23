import Users from "../collections/Users";

export const ADMIN_URL = process.env.SERVER_HOST + "/admin";
export const API_URL = process.env.SERVER_HOST + "api";

export const AUTH_ENDPOINT = "/oauth2/authorize";
export const CALLBACK_ENDPOINT = "/oauth2/callback";
export const OAUTH_AUTH_URL = process.env.SERVER_HOST + AUTH_ENDPOINT;
export const OAUTH_CALLBACK_URL = process.env.SERVER_HOST + CALLBACK_ENDPOINT;

export const USERS_COLLECTION = "users";
