export const API_BASE_URL = 'https://fakestoreapi.com';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const PRODUCTS = getApiUrl('/products')
export const DELETE_PRODUCTS = getApiUrl('/products')