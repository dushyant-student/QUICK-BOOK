"use client";

import { useAuth } from "@/context/authProvider";
import { useEffect } from "react";
export default function AutoRefresh() {
  
  const { refreshUser } = useAuth();
  
  useEffect(() => {
      window.location.reload()
  }, [refreshUser]);

  return null;
}
