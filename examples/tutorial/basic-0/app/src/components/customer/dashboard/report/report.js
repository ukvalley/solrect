import React from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';

const Report = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {
  
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>

      <header>
        <h1>{name}</h1>
      </header>

      
    
    </main>

    
  );
};

export default Report;