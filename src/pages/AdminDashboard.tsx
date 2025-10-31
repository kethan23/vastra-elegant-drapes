import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewCards from '../components/OverviewCards';
import ProductTable from '../components/ProductTable';
import OrderTable from '../components/OrderTable';
import CustomerTable from '../components/CustomerTable';
import BannerManager from '../components/BannerManager';
import PaymentTable from '../components/PaymentTable';
import DarkModeToggle from '../components/UI/DarkModeToggle';
import SearchBar from '../components/UI/SearchBar';
import NotificationBell from '../components/UI/NotificationBell';
// TODO: Import Supabase client for authentication check
// import { supabase } from '../lib/supabaseClient';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Check authentication status with Supabase
    // const checkAuth = async () => {
    //   const { data: { session } } = await supabase.auth.getSession();
    //   if (!session) {
    //     navigate('/admin/login');
    //   } else {
    //     setIsAuthenticated(true);
    //   }
    // };
    // checkAuth();
    
    // Temporary: Set authenticated for development
    setIsAuthenticated(true);
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Vastra Admin Dashboard</h1>
        <div className="header-controls">
          <SearchBar />
          <NotificationBell />
          <DarkModeToggle />
        </div>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('products')}>Products</button>
        <button onClick={() => setActiveTab('orders')}>Orders</button>
        <button onClick={() => setActiveTab('customers')}>Customers</button>
        <button onClick={() => setActiveTab('banners')}>Banners</button>
        <button onClick={() => setActiveTab('payments')}>Payments</button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && <OverviewCards />}
        {activeTab === 'products' && <ProductTable />}
        {activeTab === 'orders' && <OrderTable />}
        {activeTab === 'customers' && <CustomerTable />}
        {activeTab === 'banners' && <BannerManager />}
        {activeTab === 'payments' && <PaymentTable />}
      </main>
    </div>
  );
};

export default AdminDashboard;
