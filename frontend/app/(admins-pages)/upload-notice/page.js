
"use client";

import { useState } from "react";
import { Bell, Send, X } from "lucide-react";
import { sendNotice } from "@/services/NoticeService";
import { useAuth } from "@/context/authProvider";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SendNotice({ onSend }) {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("General");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [phone, setPhone] = useState("");
    const { user , myShopInfo } = useAuth();
    const shopId = user?._id;



    // Phone Number Change
    const handlePhoneChange = (e) => {
        // Only allow numbers
        const value = e.target.value.replace(/\D/g, "");

        // Maximum 10 digits Can Enter 
        if (value.length <= 10) {
            setPhone(value);
        }
    };

    // Send Notice
    const handleSend = async () => {
        try {
            
            if (!shopId) {
                toast.error("Shop information not found!");
                return;
            }

        
            if (!title.trim()) {
                toast.error("Please enter notice title!");
                return;
            }

     
            if (!message.trim()) {
                toast.error("Please enter notice message!");
                return;
            }

            
            if (!phone.trim()) {
                toast.error("Please enter phone number!");
                return;
            }

            // Exactly 10 digits
            if (!/^[0-9]{10}$/.test(phone)) {
                toast.error("Please enter a valid 10 digit phone number!");
                return;
            }

            setLoading(true);

            const noticeData = {
                title: title.trim(),
                message: message.trim(),
                type,
                phone,
                name: user?.name,
                email: user?.email,
            };

        

            const response = await sendNotice(shopId, noticeData);

            if (!response?.success) {
                toast.error(response?.message || "Failed to send notice!");
                return;
            }

            toast.success("Notice successfully sent!");

            // Clear form
            setTitle("");
            setMessage("");
            setPhone("");
            setType("General");

            // Optional parent callback
            if (onSend) {
                onSend(response);
            }
        } catch (err) {
            console.error("Error in Sending Notice:", err);

            toast.error(
                err?.response?.data?.message ||
                "Something went wrong while sending notice!"
            );
        } finally {
            setLoading(false);
        }
    };

    // Clear Form
    const handleClear = () => {
        setTitle("");
        setMessage("");
        setPhone("");
        setType("Important");
    };

    if ( !myShopInfo ){
    return (
    <div className="flex flex-col justify-center gap-12 items-center mt-40 " >
      <h1 className="font-bold" > Currently ,You Have Not Any Shop For Notify The Customers ! </h1>
      <Link href="/create-shop" className={`text-white font-bold md:flex px-4 py-2 rounded-xl bg-blue-600 `}>
        Create SHOP
      </Link>
    </div>
    )
  }



    return (
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-26 shadow-sm md:my-30 mx-auto">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                    <Bell
                        size={22}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Send Notice
                    </h2>

                    <p className="text-sm text-gray-500">
                        Send an important notification to customers
                    </p>
                </div>
            </div>

            {/* Notice Type */}
            <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Notice Type
                </label>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    
                    <option value="Alert">Alert</option>
                    <option value="Important">Important</option>
                    <option value="Update">Update</option>
                    <option value="Timing Change">
                        Change Timing
                    </option>
                </select>
            </div>

            {/* Form Fields */}
            <div className="mt-6 flex flex-col gap-5">

                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Notice Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write a short notice title..."
                        maxLength={50}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="mt-1 text-right text-xs text-gray-400">
                        {title.length}/50
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Notice Message
                    </label>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your notice here..."
                        rows={5}
                        maxLength={800}
                        className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="mt-1 text-right text-xs text-gray-400">
                        {message.length}/800
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Customer Phone Number
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter 10 digit mobile number"
                        inputMode="numeric"
                        maxLength={10}
                        className={`w-full rounded-lg border bg-white p-3 text-sm outline-none transition focus:ring-2 ${
                            phone.length > 0 && phone.length !== 10
                                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                    />

                    <div className="mt-1 flex justify-between text-xs">
                        <span
                            className={
                                phone.length > 0 && phone.length !== 10
                                    ? "text-red-500"
                                    : "text-gray-400"
                            }
                        >
                            {phone.length > 0 && phone.length !== 10
                                ? "Phone number must be 10 digits"
                                : "Enter a valid 10 digit mobile number"}
                        </span>

                        <span className="text-gray-400">
                            {phone.length}/10
                        </span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">

                {/* Clear */}
                <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X size={16} />
                    Clear
                </button>

                {/* Send */}
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send size={16} />

                    {loading ? "Sending..." : "Send Notice"}
                </button>
            </div>
        </div>
    );
}

