import React, { useState, useEffect } from 'react';
// TODO: Import Supabase client for data operations
// import { supabase } from '../lib/supabaseClient';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  order_date: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  payment_status: 'paid' | 'pending' | 'failed';
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // TODO: Fetch orders from Supabase
    // try {
    //   const { data, error } = await supabase
    //     .from('orders')
    //     .select(`
    //       *,
    //       customers:customer_id (name, email),
    //       order_items:order_items (count)
    //     `)
    //     .order('order_date', { ascending: false });
    //   
    //   if (error) throw error;
    //   setOrders(data || []);
    // } catch (error) {
    //   console.error('Error fetching orders:', error);
    // } finally {
    //   setLoading(false);
    // }

    // Temporary mock data
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          customer_name: 'Priya Sharma',
          customer_email: 'priya@example.com',
          order_date: new Date().toISOString(),
          total_amount: 8999,
          status: 'processing',
          items: 2,
          payment_status: 'paid',
        },
        {
          id: '2',
          customer_name: 'Rajesh Kumar',
          customer_email: 'rajesh@example.com',
          order_date: new Date(Date.now() - 86400000).toISOString(),
          total_amount: 5499,
          status: 'shipped',
          items: 1,
          payment_status: 'paid',
        },
        {
          id: '3',
          customer_name: 'Ananya Patel',
          customer_email: 'ananya@example.com',
          order_date: new Date(Date.now() - 172800000).toISOString(),
          total_amount: 12999,
          status: 'pending',
          items: 3,
          payment_status: 'pending',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    // TODO: Update order status in Supabase
    // try {
    //   const { error } = await supabase
    //     .from('orders')
    //     .update({ status: newStatus })
    //     .eq('id', orderId);
    //   
    //   if (error) throw error;
    //   fetchOrders();
    // } catch (error) {
    //   console.error('Error updating order status:', error);
    // }

    // Temporary mock update
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-table">
      <div className="table-header">
        <h2>Order Management</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>
                <div>{order.customer_name}</div>
                <div className="email">{order.customer_email}</div>
              </td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.items}</td>
              <td>₹{order.total_amount}</td>
              <td>
                <span className={`payment-badge ${order.payment_status}`}>
                  {order.payment_status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                  className={`status-select ${order.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button className="view-btn">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
