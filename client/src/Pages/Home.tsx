/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useUserStore } from "@/store/store";
import axiosInstance from "@/util/axiosInstance";
import Navbar from "@/components/Navbar";

const Home = () => {
  const token = localStorage.getItem("token");
  const setUser = useUserStore((state: any) => state.setUser);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response?.data?.data;

        if (userData) {
          setUser(userData); // Store user in Zustand
        } else {
          console.error("No user data in API response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user) {
      fetchUser(); // Fetch user data only if not already set
    }
  }, [token, setUser, user]);

  if (!user) {
    return <div>Loading user data...</div>; // Show loading until user data is fetched
  }

  return (
    <div>
      <Navbar />
    </div>
  )
};

export default Home;
