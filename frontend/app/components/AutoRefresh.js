"use client";

import { useEffect } from "react";

export default function AutoRefresh() {
  
  useEffect(() => {
      window.location.reload()
  }, []);

  return null;
}
