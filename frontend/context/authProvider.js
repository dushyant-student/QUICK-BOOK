
"use client";

import { createContext, useContext, useEffect, useState, useCallback,} from "react";
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

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  
  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/auth/me`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (response.ok && data?.success) {
        setUser(data.user);
        return data.user;
      }

      setUser(null);
      return null;

    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      return null;
    }
  }, [API_URL]);



  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [refreshUser]);



  // FETCH SHOP INFORMATION
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

    } catch (error) {
      console.error("Shop info error:", error);
      setMyshopInfo(null);
    }
  }, []);


  // FETCH SHOP WHEN USER CHANGES
  useEffect(() => {
    if (!isLoading) {
      ShopInfo(user?._id || user?.id);
    }
  }, [user, isLoading, ShopInfo]);


  // RESTORE VIEW SETTINGS
  useEffect(() => {
    const savedView = sessionStorage.getItem("viewALL");

    if (savedView !== null) {
      setViewALL(savedView === "true");
    }
  }, []);


  const changeView = () => {
    setViewALL((prev) => {
      const newView = !prev;
      sessionStorage.setItem("viewALL", String(newView));
      return newView;
    });
  };


  
  //All Notifications
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getShopNotifications();

        setGenNotification(response?.data || null);
        setNoti_len(response?.data?.length ?? 0);

      } catch (error) {
        console.error("Notification fetch failed:", error);
      }
    };

    if (!isLoading && user) {
      fetchNotification();
    }
  }, [isLoading, user]);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refreshUser,
        myShopInfo,
        isLoading,
        viewALL,
        changeView,
        genNotification,
        noti_len,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
