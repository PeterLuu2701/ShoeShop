import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getAllProductApi,
  getProductAction,
} from '../../redux/reducer/productReducer';
import ShoesCard from '../../components/ShoesCard';
import { NavLink } from 'react-router-dom';

const contentStyle = {
  paddingTop: '100px',
  margin: 0,
  height: '700px',
  color: '#999',
  lineHeight: '160px',
  minHeight: '700px',
  textAlign: 'left',
  background: '#fff',
};

const Home = () => {
  const { arrProduct } = useSelector((state) => state.productReducer);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  console.log('arrProduct: ', arrProduct);

  const dispatch = useDispatch();

  const getAllProduct = async () => {
    const action2 = getAllProductApi;
    dispatch(action2);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <Carousel afterChange={onChange} autoplay={true} effect={'scroll'}>
        {arrProduct.slice(0, 4).map((item, index) => {
          return (
            <div key={index}>
              <div
                style={contentStyle}
                className="row row-cols-1 row-cols-md-2 carousel"
              >
                <div className="col-12 col-sm-12 col-md-5 carousel-img">
                  <img
                    className="img-fluid"
                    src={item.image}
                    alt=""
                    style={{ margin: '0 auto' }}
                  />
                </div>
                <div
                  className="col-12 col-sm-12 col-md-7 carousel_right"
                  style={{ minHeight: '500px' }}
                >
                  <div className="carousel_right_content">
                    <h2>{item.name}</h2>
                    <h3 className="home_description">{item.description}</h3>
                    <button className="btn btn-success home_to_detail">
                      <NavLink to={`/detail/${item?.id}`}>Buy Now</NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className="container product-feature">
        <h3>Product Feature</h3>
        <div className="row row-cols-1 row-cols-md-3">
          {arrProduct.map((prod, idx) => {
            return (
              <div className="col" key={prod.id}>
                <ShoesCard prod={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
