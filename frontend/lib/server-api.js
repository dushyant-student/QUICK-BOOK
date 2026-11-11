
import "server-only";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;


export async function serverApi(endpoint, options = {}) {

    if (!API_URL) {
        throw new Error("BACKEND_API_URL is missing");
    }
    

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
    `${API_URL.replace(/\/$/, "")}${endpoint}`,
    {
        ...options,
        headers: {
            ...options.headers,
            ...(token ? { Cookie: `token=${token}` } : {}),
        },
        cache: "no-store",
     }
    );

    if (!response.ok) {
        // const errorText = await response.text();

        throw new Error(`API failed: ${response.status}`);
    }

    return response.json();
}
