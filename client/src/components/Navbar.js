import React from 'react';
import '../CSS/index.css';
const Navbar = ({ name }) => {
  return (
    <nav>
      <h3>{name}</h3>
    </nav>
  );
};
export default Navbar;
