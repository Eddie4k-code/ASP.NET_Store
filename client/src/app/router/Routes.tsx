import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { Catalog } from "../../features/catalog/Catalog";
import { ProductDetail } from "../../features/catalog/ProductDetail";
import { PageNotFound } from "../layout/PageNotFound";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetail />},
            {path: '*', element: <PageNotFound />}
        ]
    }
]);