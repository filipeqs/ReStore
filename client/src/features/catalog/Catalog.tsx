import { useEffect } from 'react';
import ProductList from './ProductList';
import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductAsync, productSelectors } from './catalogSlice';

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductAsync());
  }, [productLoaded, dispatch]);

  if (status.includes('pending'))
    return <Loading message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
