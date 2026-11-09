"use client";


import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getShopNotifications } from "@/services/genNotifiServices";
import { ShopById } from "@/services/createShopServices";



const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myShopInfo, setMyshopInfo] = useState(null);
  const [genNotification, setGenNotification] = useState(null);
  const [noti_len, setNoti_len] = useState(0);
  const [viewALL, setViewALL] = useState(false);
  let userId = null;
  let API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ;

  // CHECK AUTH USER
  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        
        
        const data = await response.json();


        if (!mounted) return;

        if (response.ok && data?.success) {

          setUser(data.user);

        } else {
          setUser(null);
        }
      } catch (error) {
        // console.error("Auth check failed:", error);

        if (mounted) {
          setUser(null);
        }

      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getUser();

    return () => {
      mounted = false;
    };
  }, []);

  userId = user?._id;



  // 4. Fetch logged-in user's shop
  const ShopInfo = useCallback(async (userId) => {
    if (!userId) {
      setMyshopInfo(null);
      return;
    }

    try {
      const response = await ShopById(userId);


      if (response.success) {
        setMyshopInfo(
          Array.isArray(response.data)
            ? response.data[0] || null
            : response.data || null
        );
      } else {
        setMyshopInfo(null);
      }

      // console.log("Shop info fetched:", response.data);
    } catch (error) {
      // console.error("Shop info error:", error);
      setMyshopInfo(null);
    }
  }, []);



  useEffect(() => {
    const savedView = sessionStorage.getItem("viewALL");

    if (savedView !== null) {
      setViewALL(savedView === "true");
    }
  }, []);


  const changeView = () => {
    setViewALL(prev => {
      const newView = !prev;
      sessionStorage.setItem("viewALL", String(newView));
      return newView;
    });
  };



  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getShopNotifications();

        setGenNotification(response?.data || null);
        setNoti_len(response?.data?.length ?? 0);
      } catch (error) {
        // console.error("Notification fetch failed:", error);
      }
    };

    fetchNotification();
  }, []);




  // Fetch shop whenever userId changes
  useEffect(() => {
    if (!isLoading) {
      ShopInfo(userId);
    }
  }, [userId, isLoading, ShopInfo]);


  
  return (
    <AuthContext.Provider
      value={{
        user,
        myShopInfo,
        isLoading,
        viewALL,
        changeView,
        genNotification,
        noti_len
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}