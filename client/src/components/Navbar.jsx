import React, { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-800 px-4 pb-2">
      <div className="flex justify-between items-center ">
        <div className="text-white font-mono text-2xl font-semibold">
          <Link to="/" className="text-xl flex flex-col">
            <span>Sahoo</span>
            <span>blog.</span>
          </Link>
        </div>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <RxAvatar className="text-2xl text-white" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {isDropdownOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M2.293 7.293a1 1 0 011.414 0L10 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M2.293 9.293a1 1 0 011.414 0L10 16.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
            {isDropdownOpen && <AvatarDropdown />}
          </div>
        ) : (
          <div className="text-white">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import { RxAvatar } from "react-icons/rx";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };
//   return (
//     <div className="bg-indigo-950 text-white">
//       <div className="flex p-4 justify-between gap-10  items-center">
//         <div>
//           <Link to="/" className="text-xl ">
//             <b>
//               Sahoo <br /> blog.
//             </b>
//           </Link>
//         </div>
//         {/* <ul className="flex gap-8">
//           <li>Home</li>
//           <li>About</li>
//           <li>Contacts</li>
//           <li>Categories</li>
//         </ul> */}
//         <div>
//           <div
//             className="text-2xl"
//             onClick={() => setShowModal((prev) => !prev)}
//           >
//             <RxAvatar />
//           </div>
//           {showModal && (
//             <div className="flex-col">
//               <Link to="/create">Create</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
