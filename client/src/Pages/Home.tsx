import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../Redux/Slice/user.slice";
import axiosInstance from "@/util/axiosInstance";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/currentUser", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const userData = response?.data?.data;

        if (userData) {
          // console.log("Fetched User Data:", userData);
          dispatch(setUser(userData));
        } else {
          console.error("No user data in API response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return <div>Hi Bro</div>;
};

export default Home;
