import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { Catalog } from "../../features/catalog/Catalog";
import { ProductDetail } from "../../features/catalog/ProductDetail";
import { PageNotFound } from "../layout/PageNotFound";
import { CartPage } from "../../features/cart/CartPage";
import { Test } from "../../test/test";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetail />},
            {path: 'cart', element: <CartPage />},
            {path: '*', element: <PageNotFound />},
            {path: 'test', element:<Test />}
        ]
    }
]);