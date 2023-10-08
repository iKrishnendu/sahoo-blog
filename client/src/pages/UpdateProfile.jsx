// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateProfile } from "..redux/authSlice"; // Import your updateProfile action
// import { updateProfile } from "../redux/authSlice";

// function UpdateProfile() {
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     username: "",
//     email: "",
//   });

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Dispatch the updateProfile action
//       dispatch(updateProfile(formData, user._id)); // Pass formData and user ID to the action
//       // You can redirect the user or display a success message here
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Current Password:</label>
//           <input
//             type="password"
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateProfile;
