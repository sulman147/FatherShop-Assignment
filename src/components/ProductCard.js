import React from "react";

function ProductCard({ product }) {
  return (
    <div className="bg-white p-2 ">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-80 object-cover"
      />
      <div className="flex space-x-2  py-2 mt-2 border-b">
        <button
          className="w-3 h-3 rounded-full hover:animate-pulse bg-yellow-200"
          title="Yellow"
          aria-label="Yellow"
        ></button>
        <button
          className="w-3 h-3 rounded-full hover:animate-pulse bg-blue-950"
          title="Blue"
          aria-label="Blue"
        ></button>
        <button
          className="w-3 h-3 rounded-full hover:animate-pulse bg-red-500"
          title="Red"
          aria-label="Red"
        ></button>
      </div>
      <div className="flex flex-col items-baseline">
        <h3 className="text-md text-left font-semibold mt-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm">${product.price}</p>
      </div>
      <div className="mt-2">{/* Add rating component */}</div>
    </div>
  );
}

export default ProductCard;
