import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import FilterSidebar from "../components/Filter";
import ProductCard from "../components/ProductCard";
import { BiFilterAlt } from "react-icons/bi";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};

function ProductList() {
  const { data, isLoading, isError } = useQuery("products", fetchProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 2000],
    colors: [],
    sizes: [],
  });

  const totalResults = data?.products?.length || 0;
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setfilteredProducts] = useState(data?.products);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    // Apply filters when selectedFilters or data.products change
    const filterProducts = data?.products.filter((product) => {
      const { categories, priceRange, colors, sizes } = selectedFilters;

      // Filter by category
      if (categories.length > 0 && !categories.includes(product.category)) {
        return false;
      }

      // Filter by price range
      const productPrice = parseFloat(product.price);
      if (priceRange[0] > productPrice || priceRange[1] < productPrice) {
        return false;
      }

      // Filter by color
      if (colors.length > 0 && !colors.includes(product.color)) {
        return false;
      }

      // Filter by size
      if (sizes.length > 0 && !sizes.includes(product.size)) {
        return false;
      }

      return true;
    });

    setfilteredProducts(filterProducts);
  }, [selectedFilters, data?.products]);
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/4 p-4 ">
        <div className="sticky top-0">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="w-full sm:w-3/4 p-4">
        <div className="flex my-3 items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BiFilterAlt />
            <button className="text-sm text-black font-semibold">Filter</button>
            <span className="text-sm text-gray-500">Home / Shop</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, totalResults)} of {totalResults}{" "}
              results
            </span>
            <select className="text-sm border border-gray-300 rounded-md">
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
            </select>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {filteredProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts
              .slice(indexOfFirstProduct, indexOfLastProduct)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <nav className="block">
            <ul className="flex pl-0 list-none rounded my-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`text-sm p-2 hover:bg-gray-200 ${
                      currentPage === index + 1 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
