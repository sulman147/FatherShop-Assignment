// FilterSidebar.js
import React from "react";
import PriceRangeSlider from "./PriceRangeSlider";

function FilterSidebar({ selectedFilters, onFilterChange }) {
  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedFilters.categories];

    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }

    const updatedFilters = {
      ...selectedFilters,
      categories: updatedCategories,
    };
    onFilterChange(updatedFilters);
  };

  const handlePriceRangeChange = (priceRange) => {
    const updatedFilters = { ...selectedFilters, priceRange };
    onFilterChange(updatedFilters);
  };

  const handleColorChange = (color) => {
    const updatedFilters = { ...selectedFilters, colors: [color] };
    onFilterChange(updatedFilters);
  };

  const handleSizeChange = (size) => {
    const updatedSizes = [...selectedFilters.sizes];

    if (updatedSizes.includes(size)) {
      updatedSizes.splice(updatedSizes.indexOf(size), 1);
    } else {
      updatedSizes.push(size);
    }

    const updatedFilters = { ...selectedFilters, sizes: updatedSizes };
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: [0, 2000],
      colors: [],
      sizes: [],
    };
    onFilterChange(clearedFilters);
  };

  // Filters Data
  const categories = ["Smartphones", "Fragrances", "Laptops", "Skincare"];
  const colors = ["Red", "Blue", "Orange", "Pink"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="p-4 border border-gray-300">
      <div className="flex justify-between items-baseline border-b-2 pb-2">
        <h2 className="text-md font-semibold uppercase">Refine</h2>
        <button onClick={clearAllFilters} className="text-sm text-red-600 mt-2">
          Clear All
        </button>
      </div>
      <div className="py-2 border-b-2 border-dotted">
        <h3 className="text-sm font-semibold uppercase flex mb-2">Category:</h3>
        <div>
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(category.toLowerCase())}
                checked={selectedFilters.categories.includes(
                  category.toLowerCase()
                )}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div className="py-2 border-b-2 border-dotted">
        <h3 className="text-sm font-semibold uppercase flex mb-2">
          Price Range:
        </h3>
        <div className="mr-2px">
          <PriceRangeSlider
            selectedPriceRange={selectedFilters.priceRange}
            onPriceRangeChange={handlePriceRangeChange}
          />
          <span className="flex">
            Price =
            <span>
              ${`${selectedFilters.priceRange[0]}`} - $
              {`${selectedFilters.priceRange[1]}`}
            </span>
          </span>
        </div>
      </div>
      <div className="py-2 border-b-2 border-dotted">
        <h3 className="text-sm font-semibold uppercase flex mb-2">Color:</h3>
        <div>
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                onChange={() => handleColorChange(color)}
                checked={selectedFilters.colors.includes(color)}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>
      </div>
      <div className="py-2">
        <h3 className="text-sm font-semibold uppercase flex mb-2 ">Size:</h3>
        <div>
          {sizes.map((size) => (
            <label
              key={size}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => handleSizeChange(size)}
                checked={selectedFilters.sizes.includes(size)}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
