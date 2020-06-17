// localStorage key to persist the token
export const AUTH_TOKEN = 'auth-token';
// localStorage key to persist the username
export const USERNAME = 'username';
// Backend WordPress URL
export const BACKEND_URL = 'https://development.local';
// The frontend React URL
export const FRONTEND_URL = 'http://localhost:3000';

// Config
const Config = {
  gqlUrl: BACKEND_URL + '/graphql',
  getAuthToken: () => localStorage.getItem(AUTH_TOKEN),
  setAuthToken: token => localStorage.setItem(AUTH_TOKEN, token),
  removeAuthToken: () => localStorage.removeItem(AUTH_TOKEN),
};

export default Config;