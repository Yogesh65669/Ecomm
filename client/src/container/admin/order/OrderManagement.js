// React Frontend (OrderManagement.js)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'datatables.net';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8082/orders'); // Use the /orders route
        console.log("data from backend",response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8082/orders/${orderId}`, { status: newStatus }); // Use the /orders/:orderId route
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order ${orderId} status updated to ${newStatus}!`);
    } catch (err) {
      toast.error(`Failed to update order ${orderId} status.`);
      console.error('Error updating order status:', err);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      $('#orderTable').DataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable('#orderTable')) {
        $('#orderTable').DataTable().destroy();
      }
    };
  }, [orders]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error loading orders: {error.message}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div>
      <table id="orderTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <div key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId?.username || "N/A"}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleUpdateStatus(order._id, 'Shipped')}>Ship</button>
                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')}>Deliver</button>
                <button onClick={() => handleUpdateStatus(order._id, 'Cancelled')}>Cancel</button>
              </td>
            </div> 
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default OrderManagement;