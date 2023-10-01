import React, { useEffect } from "react";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function AvatarDropdown() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    // You can also perform additional logout actions like clearing local storage or cookies here.
  };

  return (
    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
      <div className="block truncate px-4 py-2 text-gray-800">
        {user.username}
        <br />
        <span className="text-gray-950 truncate text-sm font-medium">
          {user.email}
        </span>
      </div>
      <hr />
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
        Settings
      </a>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <a
        href="#logout"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200  "
        onClick={handleLogout}
      >
        Logout
      </a>
    </div>
  );
}

export default AvatarDropdown;
