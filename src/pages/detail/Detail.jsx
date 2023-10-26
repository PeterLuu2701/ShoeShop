import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  changeProductAmountAction,
  getProductDetailAction,
  resetProductAmountAction,
} from '../../redux/reducer/productReducer';
import { getProductByIdApi } from '../../redux/reducer/productReducer';
import ShoesCard from '../../components/ShoesCard';
import { addToCartAction } from '../../redux/reducer/cartReducer';

const Detail = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { productDetail, productAmount } = useSelector(
    (state) => state.productReducer
  );

  const dispatch = useDispatch();
  const params = useParams();

  const getProductById = async () => {
    const action = getProductByIdApi(params.id);
    dispatch(action);
  };

  useEffect(() => {
    getProductById();
    dispatch(resetProductAmountAction());
  }, [params.id]);

  const changeProductAmount = (num) => {
    dispatch(changeProductAmountAction(num));
  };

  const addToCart = () => {
    if (userLogin) {
      dispatch(
        addToCartAction({
          ...productDetail,
          amount: productAmount,
        })
      );
    }
  };

  return (
    <div className="container detail">
      <div className="row row-cols-1 row-cols-md-2 mt-5">
        <div className="col-12 col-sm-12 col-md-5">
          <img src={productDetail?.image} alt="" className="img-fluid" />
        </div>
        <div className="col-12 col-sm-12 col-md-7 product_info">
          <h3>{productDetail?.name}</h3>
          <p className="w-50">{productDetail?.description}</p>
          <p className="available_size">Available Size</p>
          {productDetail?.size?.map((item, index) => {
            return (
              <button className="btn btn-dark size" key={index}>
                {item}
              </button>
            );
          })}
          <p className="text-danger price">$ {productDetail?.price}</p>
          <div className="d-flex">
            <button
              className="btn btn_qual"
              onClick={() => changeProductAmount(1)}
            >
              +
            </button>
            <p className="quantity">{productAmount}</p>
            <button
              className="btn btn_qual"
              onClick={() => changeProductAmount(-1)}
            >
              -
            </button>
          </div>
          <button className="btn btn-success add" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-3 text-center">
        <h1 className="mb-5">- Related Product -</h1>
        <div className="row row-cols-1 row-cols-md-3">
          {productDetail?.relatedProducts?.map((item, index) => {
            return (
              <div className="col" key={index}>
                <ShoesCard prod={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
