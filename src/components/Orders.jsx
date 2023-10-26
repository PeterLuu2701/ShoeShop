import { Pagination } from 'antd';
import React, { useState } from 'react';
import OrderTable from './OrderTable';

const pageSize = 2;

const Orders = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(pageSize);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <div className="order">
      <h2 className="order-title">Order history</h2>
      {orders?.length > 0 ? (
        <>
          <div className="order-tables">
            {orders?.map(
              (order, index) =>
                index >= minIndex &&
                index < maxIndex && <OrderTable key={order.id} order={order} />
            )}
          </div>
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            total={orders?.length}
            onChange={handleChangePage}
            className="d-flex justify-content-end"
            style={{ width: '96%' }}
          />
        </>
      ) : (
        <h3 className="mt-5">No orders placed yet...</h3>
      )}
    </div>
  );
};

export default Orders;
