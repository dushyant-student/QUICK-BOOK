"use client";

import { useAuth } from "@/context/authProvider.js";
import { CreateShop, UpdateShop } from "@/services/createShopServices.js";
import { Button } from "@heroui/react";
import { Camera, Eye, EyeOff, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


const initialForm = {
  name: "",
  email: "",
  passWord: "",
  role: "",
  shopName: "",
  availableStaff: "",
  experience: "",
  description: "",
  country: "",
  city: "",
  address: "",
  phoneNo: "",
  shopImage: "",
};

const fields = [
  { name: "name", label: "Your Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "passWord", label: "Password", type: "password", required: true },
  { name: "shopName", label: "Shop Name", required: true },
  { name: "availableStaff", label: "Available Staff (Max 1000)", type: "number", min: 0, max: 1000, required: true,},
  { name: "role", label: "Your Role", required: true },
  { name: "experience", label: "Experience (Years)", type: "number", min: 0, max: 70, required: true,},
  { name: "description", label: "Shop Description", required: true },
  { name: "country", label: "Country", required: true },
  { name: "city", label: "City", required: true },
  { name: "address", label: "Address", required: true },
  { name: "phoneNo", label: "Phone Number (10 digits)", type: "tel", required: false, placeholder: "Enter 10-digit phone number",}
];

const inputClass = "w-full rounded-xl border-2 border-gray-200 px-4 py-2 outline-none focus:border-green-400";

export default function Page() {
  const { myShopInfo, isLoading, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  
  const [imagePreview, setImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // Load existing shop
  useEffect(() => {
    if (isLoading || !myShopInfo) return;

    setForm({
      ...initialForm,
      ...myShopInfo,
      passWord: "",
      phoneNo: String(myShopInfo.phoneNo || ""),
      availableStaff: String(myShopInfo.availableStaff ?? ""),
      experience: String(myShopInfo.experience ?? ""),
    });
  }, [myShopInfo, isLoading]);



  // Handle all inputs
  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  
  // Image validation and preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({ ...prev, shopImage: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // Create or update shop
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setError("");

    if (!user?._id) {
      toast.error("Please login first");
      return;
    }

    if (!form.passWord || form.passWord.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Phone: optional, but exactly 10 digits if provided
    if (form.phoneNo && !/^\d{10}$/.test(form.phoneNo)) {
      toast.error("Phone number must contain exactly 10 digits");
      return;
    }

    // Available staff: 0 to 1000
    if (
      form.availableStaff === "" ||
      !Number.isInteger(Number(form.availableStaff)) ||
      Number(form.availableStaff) < 0 ||
      Number(form.availableStaff) > 1000
    ) {
      toast.error("Available staff must be between 0 and 1000");
      return;
    }

    
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "shopImage") {
          if (value instanceof File) {
            formData.append(key, value);
          }
          return;
        }

        formData.append(key, value ?? "");
      });

      formData.append("shopId", user._id);

      const response = myShopInfo
        ? await UpdateShop(user._id, formData)
        : await CreateShop(user._id, formData);

      if (response?.success) {
        toast.success(response.message || "Shop saved successfully");
        router.refresh();
      } else {
        toast.error(response?.message || "Unable to save shop");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const clearForm = () => {
    setForm(initialForm);
    setImagePreview("");
    setError("");

    if (inputRef.current) inputRef.current.value = "";
  };

  const image = imagePreview || (typeof form.shopImage === "string" && form.shopImage) || "/image/defaultImage.png";



  return (
    <main className="min-h-screen px-5 py-8 md:px-20">
      <h1 className="mb-8 text-2xl font-bold">
        {myShopInfo ? "Update Shop" : "Create Shop"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-10">
        {/* Shop Image */}
        <div>
          <img
            src={image}
            alt="Shop preview"
            className="h-32 w-48 rounded-t-lg object-cover"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-48 items-center justify-center gap-3 rounded-b bg-black px-4 py-2 text-white"
          >
            Shop Image <Camera size={16} />
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className="font-semibold">
                {field.label}
                {field.required && " *"}
              </label>

              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={
                    field.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.type || "text"
                  }
                  value={form[field.name] ?? ""}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                  maxLength={field.name === "phoneNo" ? 10 : undefined}
                  placeholder={field.placeholder || field.label}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Phone: digits only, maximum 10
                    if (
                      field.name === "phoneNo" &&
                      !/^\d{0,10}$/.test(value)
                    ) {
                      return;
                    }

                    // Staff: block values greater than 1000
                    if (
                      field.name === "availableStaff" &&
                      value !== "" &&
                      (!/^\d+$/.test(value) ||
                        Number(value) > 1000)
                    ) {
                      return;
                    }

                    // Experience: 0 to 70
                    if (
                      field.name === "experience" &&
                      value !== "" &&
                      (!/^\d+$/.test(value) ||
                        Number(value) > 70)
                    ) {
                      return;
                    }

                    handleChange(field.name, value);
                  }}
                  className={`${inputClass} ${
                    field.name === "passWord" ? "pr-12" : ""
                  }`}
                />

                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                )}
              </div>

              {field.name === "passWord" && error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          ))}
        </div>

        {/* Shop Timing */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold">Shop Timing</span>

          {myShopInfo && (
            <button
              type="button"
              onClick={() => router.push("/change-time")}
              className="flex items-center gap-2 rounded bg-green-100 px-3 py-2 text-green-700"
            >
              <Pencil size={14} /> Edit
            </button>
          )}

          <span className="rounded-xl border border-green-200 px-4 py-2">
            OPEN: {form.openTime || "9:00"}
          </span>

          <span className="rounded-xl border border-red-200 px-4 py-2">
            CLOSE: {form.closeTime || "18:00"}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-14">
          <Button
            type="button"
            onPress={clearForm}
            isDisabled={loading}
            className="bg-red-100 px-5 py-2 rounded-sm text-red-700"
          >
            Clear
          </Button>

          <Button
            type="submit"
            isDisabled={loading || isLoading}
            className="bg-green-500 px-5 text-white py-2 rounded-sm "
          >
            {loading
              ? "Saving..."
              : myShopInfo
                ? "Update Shop"
                : "Create Shop"}
          </Button>
        </div>
      </form>
    </main>
  );
}
