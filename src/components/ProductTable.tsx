import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
// TODO: Import Supabase client for data operations
// import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  created_at: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // TODO: Fetch products from Supabase
    // try {
    //   const { data, error } = await supabase
    //     .from('products')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   
    //   if (error) throw error;
    //   setProducts(data || []);
    // } catch (error) {
    //   console.error('Error fetching products:', error);
    // } finally {
    //   setLoading(false);
    // }

    // Temporary mock data
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Elegant Silk Saree',
          description: 'Beautiful handwoven silk saree',
          price: 8999,
          category: 'Sarees',
          stock: 15,
          image_url: '/images/saree1.jpg',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Cotton Kurta Set',
          description: 'Comfortable cotton kurta with palazzo',
          price: 2499,
          category: 'Kurtas',
          stock: 30,
          image_url: '/images/kurta1.jpg',
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (id: string) => {
    // TODO: Delete product from Supabase
    // try {
    //   const { error } = await supabase.from('products').delete().eq('id', id);
    //   if (error) throw error;
    //   fetchProducts();
    // } catch (error) {
    //   console.error('Error deleting product:', error);
    // }

    // Temporary mock delete
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-table">
      <div className="table-header">
        <h2>Product Management</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setShowForm(true)} className="add-button">
          Add New Product
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image_url} alt={product.name} className="product-thumbnail" />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td className={product.stock < 10 ? 'low-stock' : ''}>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default ProductTable;
