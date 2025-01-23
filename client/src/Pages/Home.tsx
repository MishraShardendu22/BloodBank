/* eslint-disable @typescript-eslint/no-explicit-any */
import Organisation from "@/components/NavLinks/Organisation";
import Hospital from "@/components/NavLinks/Hospital";
import axiosInstance from "@/util/axiosInstance";
import Donor from "@/components/NavLinks/Donor";
import MedicalLoader from "@/components/Loader";
import { useUserStore } from "@/store/store";
import Sidebar from "@/components/Header";
import { useEffect } from "react";
import Layout from "./Layout";
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
          setUser(userData);
        } else {
          console.error("No user data in API response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [token, setUser, user]);

  if (!user) {
    return <MedicalLoader />
  }

  return (
    <Layout>
      <div>
        <Sidebar />
        <div>
          <Donor />
          <Hospital />
          <Organisation />
        </div>
      </div>
    </Layout>
  )
};

export default Home;
