import React, { useState, useEffect } from 'react';
// TODO: Import Supabase client for data fetching
// import { supabase } from '../lib/supabaseClient';

interface OverviewStats {
  totalProducts: number;
  totalOrders: number;
  totalPayments: number;
  totalCustomers: number;
  recentOrders: number;
  pendingOrders: number;
}

const OverviewCards: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalPayments: 0,
    totalCustomers: 0,
    recentOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from Supabase/Firebase
    // const fetchStats = async () => {
    //   try {
    //     const { data: products } = await supabase.from('products').select('*');
    //     const { data: orders } = await supabase.from('orders').select('*');
    //     const { data: customers } = await supabase.from('customers').select('*');
    //     const { data: payments } = await supabase.from('payments').select('*');
    //     
    //     setStats({
    //       totalProducts: products?.length || 0,
    //       totalOrders: orders?.length || 0,
    //       totalPayments: payments?.reduce((sum, p) => sum + p.amount, 0) || 0,
    //       totalCustomers: customers?.length || 0,
    //       recentOrders: orders?.filter(o => new Date(o.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0,
    //       pendingOrders: orders?.filter(o => o.status === 'pending').length || 0,
    //     });
    //   } catch (error) {
    //     console.error('Error fetching stats:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchStats();

    // Temporary mock data for development
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalOrders: 342,
        totalPayments: 125000,
        totalCustomers: 789,
        recentOrders: 45,
        pendingOrders: 23,
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="loading">Loading overview...</div>;
  }

  return (
    <div className="overview-cards">
      <div className="card">
        <h3>Total Products</h3>
        <p className="stat-value">{stats.totalProducts}</p>
        <p className="stat-label">Active products in catalog</p>
      </div>

      <div className="card">
        <h3>Total Orders</h3>
        <p className="stat-value">{stats.totalOrders}</p>
        <p className="stat-label">All-time orders</p>
      </div>

      <div className="card">
        <h3>Total Revenue</h3>
        <p className="stat-value">₹{stats.totalPayments.toLocaleString()}</p>
        <p className="stat-label">From all payments</p>
      </div>

      <div className="card">
        <h3>Total Customers</h3>
        <p className="stat-value">{stats.totalCustomers}</p>
        <p className="stat-label">Registered customers</p>
      </div>

      <div className="card highlight">
        <h3>Recent Orders</h3>
        <p className="stat-value">{stats.recentOrders}</p>
        <p className="stat-label">Last 7 days</p>
      </div>

      <div className="card highlight">
        <h3>Pending Orders</h3>
        <p className="stat-value">{stats.pendingOrders}</p>
        <p className="stat-label">Requires attention</p>
      </div>
    </div>
  );
};

export default OverviewCards;
