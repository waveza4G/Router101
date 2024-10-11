import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { addProduct, removeProduct } from '../features/productSlice'; 
import './Products.css'; // Import the CSS file for styling

function Products() { 
  const dispatch = useDispatch(); 
  const productList = useSelector((state) => state.products); 
  
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => { 
    if (newProduct.id && newProduct.name && newProduct.price) {
      dispatch(addProduct(newProduct)); 
      setNewProduct({ id: '', name: '', price: '', description: '' }); // clear form
      setIsFormVisible(false); // hide form after adding the product
    }
  }; 

  const handleRemoveProduct = (id) => { 
    dispatch(removeProduct(id)); 
  }; 

  return ( 
    <div className="container"> 
      <h2 className="product-list-title">Product List</h2> 
      <ul className="product-list"> 
        {productList.map(product => ( 
          <li key={product.id} className="product-item"> 
            <Link to={`/product/${product.id}`} className="product-link"> 
              {product.name} - ${product.price} 
            </Link> 
            <button className="remove-btn" onClick={() => handleRemoveProduct(product.id)}>Remove</button> 
          </li> 
        ))} 
      </ul> 

      {/* Button to show the form */}
      {!isFormVisible && (
        <button className="add-btn" onClick={() => setIsFormVisible(true)}>Add a new product</button>
      )}

      {/* Conditionally render the form based on state */}
      {isFormVisible && (
        <div className="form-container">
          <h3>Add a new product</h3>
          <input
            type="text"
            name="id"
            value={newProduct.id}
            onChange={handleInputChange}
            placeholder="Product ID"
            className="input-field"
          />
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="input-field"
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Product Price"
            className="input-field"
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="input-field"
          />
          <button className="submit-btn" onClick={handleAddProduct}>Add Product</button> 

          {/* Option to cancel adding a product */}
          <button className="cancel-btn" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div> 
  ); 
} 

export default Products;
