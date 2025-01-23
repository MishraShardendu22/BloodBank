
















// import axiosInstance from "@/util/axiosInstance";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setUser } from "../Redux/Slice/user.slice";

// const Home = () => {
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axiosInstance.get("/auth/currentUser", {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//         },
//       });

//       console.log("API Response:", response.data.data);

//         dispatch(setUser(response.data.data));
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//       fetchUser();
//     }, [dispatch]);


//   return (
//     <div>
//       Hi Bro
//     </div>
//   );
// };

// export default Home;


