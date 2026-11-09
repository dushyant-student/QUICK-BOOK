"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import HomeNavBar from "./HomeNavBar";
import { useAuth } from "@/context/authProvider";

export default function ShopSearchResults() {
  const { user } = useAuth();
  const params = useSearchParams();
  const query = params.get("q") || "";
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchShops() {

      if (!query.trim()) {
        setShops([]);
        setLoading(false);
        setError("");
        return;
      }


      try {

        setLoading(true);
        setError("");

        const response = await api.get("/shops/search", {
          params: { q: query },
        });

        if (!ignore) {
          setShops(response.data?.shops || []);
        }
      } catch (err) {
        // console.error("Shop search error:", err);

        if (!ignore) {
          setError("Shops Not Load... Please try again.");
          setShops([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchShops();

    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-10 pt-24">
      <HomeNavBar user={user} />
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Shop Search
      </h1>

      <p className="mb-6 text-gray-600">
        Results for: <span className="font-semibold">{query}</span>
      </p>

      {loading && (
        <p className="py-8 text-center text-gray-600">
          Searching shops...
        </p>
      )}

      {!loading && error && (
        <p className="py-6 text-center text-red-600">{error}</p>
      )}

      {!loading && !error && shops.length === 0 && (
        <p className="py-8 text-center text-gray-600">
          {query ? "No shops found." : "Shop search karne ke liye naam enter karo."}
        </p>
      )}

      {!loading && !error && shops.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <Link
              key={shop.objectID}
              href={`/shop/${shop.shopId}`}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {shop.shopImage ? (
                <img
                  src={shop.shopImage}
                  alt={shop.shopName || shop.name || "Shop"}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-orange-50 text-orange-500">
                  No shop image
                </div>
              )}

              <div className="p-4">
                <h2 className="mb-2 text-lg font-bold text-gray-900">
                  {shop.shopName || shop.name || "Unnamed shop"}
                </h2>

                {shop.city && (
                  <p className="text-sm text-gray-600">{shop.city}</p>
                )}

                {shop.address && (
                  <p className="mt-1 text-sm text-gray-500">
                    {shop.address}
                  </p>
                )}

                {shop.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {shop.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}