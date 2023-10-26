import React from 'react';
import { NavLink } from 'react-router-dom';

const ShoesCard = (props) => {
  const { prod } = props;

  return (
    <div className="card mb-3">
      <img src={prod?.image} alt="" />
      <img src="./img/unlike.png" alt="" className="like" />
      <div className="card-body">
        <h3 className="product-name">
          {prod?.name.length > 25
            ? prod.name.substring(0, 20) + '...'
            : prod.name}
        </h3>
        <p className="mb-5 product-short-description">
          {prod?.shortDescription}
        </p>
        <NavLink
          to={`/detail/${prod?.id}`}
          className="btn btn-success to_detail"
        >
          View Detail
        </NavLink>
        <span className="btn btn-light price">$ {prod?.price}</span>
      </div>
    </div>
  );
};

export default ShoesCard;
