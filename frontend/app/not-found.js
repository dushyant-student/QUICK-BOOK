
import Link from "next/link";

export default function NotFound() {
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold">
        Shop Not Found
      </h2>

      <p className="mt-2 text-gray-500">
        This shop does not exist or the link is invalid.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
