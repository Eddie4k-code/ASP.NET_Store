import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../../app/models/product';

export const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/product/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <h2>Loading Product...</h2>
    }

    if (!product) {
        return <h2>Product Not Available at this time, sorry!</h2>
    }


    return (
        
        
    <>
    {id}

    </>

    );
}