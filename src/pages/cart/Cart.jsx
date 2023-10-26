import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  calculateTotalsAction,
  changeProductQuantityAction,
  deleteProductAction,
  submitOrderApi,
} from '../../redux/reducer/cartReducer';

const Cart = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { cartProducts, cartAmount, cartTotalPrice } = useSelector(
    (state) => state.cartReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    dispatch(calculateTotalsAction());
  }, [cartProducts]);

  const changeProductQuantity = (id, num) => {
    dispatch(changeProductQuantityAction({ id, num }));
  };

  const submitOrder = (products, email) => {
    const orderDetail = products.map((product) => ({
      productId: product.id,
      quantity: product.amount,
    }));

    dispatch(
      submitOrderApi({
        orderDetail,
        email,
      })
    );

    window.location.reload();
  };

  return (
    <section className="cart">
      <div className="container">
        <h1 className="cart__title my-5 pb-4">Your Cart</h1>
        {cartProducts.length === 0 ? (
          <div>
            <h2 className="mb-5">is curently empty...</h2>
            <NavLink className="btn-home" to={'/'}>
              shopping now
            </NavLink>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table cart__table text-center">
              <thead>
                <tr className="table-secondary">
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product) => (
                  <tr key={product.id} className="align-middle">
                    <td>{product.id}</td>
                    <td style={{ width: 120 }}>
                      <img
                        className="img-fluid"
                        src={product.image}
                        alt={product.name}
                      />
                    </td>
                    <td className="align-middle">{product.name}</td>
                    <td className="align-middle">$ {product.price}</td>
                    <td className="align-middle">
                      <button
                        className="btn-quantity"
                        onClick={() => changeProductQuantity(product.id, 1)}
                      >
                        +
                      </button>
                      <span className="quantity py-1 mx-3">
                        {product.amount}
                      </span>
                      <button
                        className="btn-quantity"
                        onClick={() => changeProductQuantity(product.id, -1)}
                      >
                        -
                      </button>
                    </td>
                    <td className="align-middle">
                      $ {product.price * product.amount}
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn-delete"
                        onClick={() =>
                          dispatch(deleteProductAction(product.id))
                        }
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="table-info">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="align-middle">{cartAmount}</td>
                  <td className="align-middle">$ {cartTotalPrice}</td>
                  <td className="align-middle">
                    <button
                      className="btn-order"
                      onClick={() => submitOrder(cartProducts, userLogin.email)}
                    >
                      submit order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
