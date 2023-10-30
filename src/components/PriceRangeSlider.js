import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles

function PriceRangeSlider({ selectedPriceRange, onPriceRangeChange }) {
  return (
    <Slider
      min={0}
      max={2000}
      range
      value={selectedPriceRange}
      onChange={onPriceRangeChange}
    />
  );
}

export default PriceRangeSlider;
