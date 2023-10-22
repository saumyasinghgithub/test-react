import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    price: "",
  });
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.price) {
      const priceRange = filters.price.split("-");
      filtered = filtered.filter((product) => {
        const price = product.price;
        return (
          price >= parseFloat(priceRange[0]) &&
          price <= parseFloat(priceRange[1])
        );
      });
    }

    setFilteredProducts(filtered);
  }, [filters, products]);
  return (
    <>
      <header>
        <div className="top-header">
          <span>React.js SkillTest</span>
          <div className="cta">
            <a className="button ancRtPad" href="/HelpCenter">
              Help Center
            </a>
            <a className="button" href="/logout">
              Logout
            </a>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="leftSidebar col-3">
          <div className="sidebarWrapper">
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/home.jpg" />
              <span className="span-text">Home</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/grid1.png" />
              <span className="span-text">My Products</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/printer1.png" />
              <span className="span-text">Printing Methods</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/fi_925748.png" />
              <span className="span-text">Pricing Rules</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/fi_3169263.png" />
              <span className="span-text">Theme Builder</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/fi_11482468.png" />
              <span className="span-text">Orders</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/Saveddesigns.png" />
              <span className="span-text">Saved Designs</span>
            </div>
            <div className="sidebarLink">
              <img className="icon-img" src="/assets/images/Settings.png" />
              <span className="span-text">Settings</span>
            </div>
          </div>
        </div>
        <div className="Grid col-9">
          <div className="row">
            <div className="top-section col-8">
              <h1 className="grid-title">My Products</h1>
            </div>
            <div className="filter col-4">
              <div className="row">
                <div className="col-6">
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">Category</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <select
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                  >
                    <option value="">Price Range</option>
                    <option value="0-10">$0 - $10</option>
                    <option value="10-20">$10 - $20</option>
                    <option value="20-30">$20 - $30</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row tab-row">
            <div className="row tab-pad">
              <div className="tab-container">
                <div className="tab col-1 active">Active</div>
                <div className="tab col-1">Drafts</div>
              </div>
            </div>
          </div>
          <div className="grid-main">
            <div className="row row-padding">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 productCard">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.title}
                    />
                    <div class="color-overlay"></div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.title.slice(0, 16)}
                      </h5>
                      <p className="card-text">Category: {product.category}</p>
                      <p className="card-text">Price: ${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
