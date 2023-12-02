import axios, { AxiosError, AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import { IProductParams } from '../app/models/product';


//ALL API REQUESTS TO BACKEND RELATED FUNCTIONALITY


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true; //allow browser to recieve cookie from backend.


//Return data from a axios response
const responseBody = (response: AxiosResponse) => response.data;

//Handle all types of axios requests
export const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}


//All API Requests to backend related to Catalog
const catalog = {
    list: (params: URLSearchParams) => requests.get('product', params), //Fetch all products
    productDetail: (id: number) => requests.get(`product/${id}`) //fetch specific product based on id
}
//Retrieve all axios params related to fetching products
export const getAxiosProductParams = (productParams: IProductParams) => {

    const params = new URLSearchParams();

    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy!.toString());
    
    if (productParams.searchTerm) {

        params.append('searchTerm', productParams.searchTerm.toString());

    }

    return params;
   

}


//All API Requests to backend related to cart
const cart = {
    get: () => requests.get('cart'),
    addItem: (productId: number, quantity = 1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
}




export const caller = {
    catalog,
    cart
}