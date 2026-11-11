
"use client";

import { useEffect, useRef } from "react";

export default function HomeRefresh() {
  const refreshed = useRef(false);

  useEffect(() => {
    if (!refreshed.current) {
      refreshed.current = true;
      window.location.reload();
    }
  }, []);

  return null;
}
