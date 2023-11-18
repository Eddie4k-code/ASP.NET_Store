import axios, { AxiosError, AxiosResponse } from 'axios';
import {toast} from 'react-toastify';

//ALL API REQUESTS TO BACKEND RELATED FUNCTIONALITY


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


//Return data from a axios response
const responseBody = (response: AxiosResponse) => response.data;

//Handle all types of axios requests
export const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}


//All API Requests to backend related to Catalog
const catalog = {
    list: () => requests.get('product'), //Fetch all products
    productDetail: (id: number) => requests.get(`product/${id}`) //fetch specific product based on id
}


export const caller = {
    catalog
}