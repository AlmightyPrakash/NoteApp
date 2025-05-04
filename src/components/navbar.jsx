import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 justify-center p-5 bg-blue-100 shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) => `text-lg font-semibold hover:text-blue-500 ${isActive ? "text-blue-600 underline" : ""}`}
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) => `text-lg font-semibold hover:text-blue-500 ${isActive ? "text-blue-600 underline" : ""}`}
      >
        Pastes
      </NavLink>
      <div className='ml-auto text-lg font-semibold text-gray-700 '>
        Created By Prakash
      </div>
    </div>
  );
};

export default Navbar;

