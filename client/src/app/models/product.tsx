//Shape of Product
export interface IProduct {
    id: number,
    name: string,
    description: string
    price: number,
    pictureUrl: string,
    type?: string,
    brand: string,
    quantityInStock?: number
}


//Params needed for request related to product
export interface IProductParams {
    orderBy?: string
    searchTerm?: string
    pageNumber: number
    pageSize: number
}