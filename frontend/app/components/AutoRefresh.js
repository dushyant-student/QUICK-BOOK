"use client";

import { useAuth } from "@/context/authProvider";
import { useEffect } from "react";
const { refreshUser } = useAuth();
export default function AutoRefresh() {
  
  useEffect(() => {
      window.location.reload()
  }, [refreshUser]);

  return null;
}
