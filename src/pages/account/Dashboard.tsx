import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Users, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/account/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/account/login');
  };

  // Sample KPI data
  const kpis = [
    {
      title: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      title: 'Active Users',
      value: '856',
      icon: Users,
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      title: 'Revenue',
      value: '₹45,678',
      icon: DollarSign,
      change: '+15.3%',
      changeType: 'positive',
    },
  ];

  // Sample recent orders data
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Rajesh Kumar',
      product: 'Silk Saree',
      amount: '₹3,500',
      status: 'Completed',
      date: '2025-10-30',
    },
    {
      id: 'ORD-002',
      customer: 'Priya Sharma',
      product: 'Cotton Curtains',
      amount: '₹1,200',
      status: 'Processing',
      date: '2025-10-30',
    },
    {
      id: 'ORD-003',
      customer: 'Amit Patel',
      product: 'Designer Drapes',
      amount: '₹4,800',
      status: 'Shipped',
      date: '2025-10-29',
    },
    {
      id: 'ORD-004',
      customer: 'Sneha Reddy',
      product: 'Embroidered Fabric',
      amount: '₹2,300',
      status: 'Completed',
      date: '2025-10-29',
    },
    {
      id: 'ORD-005',
      customer: 'Vikram Singh',
      product: 'Velvet Curtains',
      amount: '₹5,600',
      status: 'Processing',
      date: '2025-10-28',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Admin'}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {kpi.title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {kpi.value}
                    </h3>
                    <p className="text-sm text-green-600 mt-2">
                      {kpi.change} from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders Table */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {order.product}
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {order.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(order.status)
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
