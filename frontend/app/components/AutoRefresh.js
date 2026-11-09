"use client";

import { useEffect } from "react";

export default function AutoRefresh() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      window.location.reload();
    }
  }, []);

  return null;
}
