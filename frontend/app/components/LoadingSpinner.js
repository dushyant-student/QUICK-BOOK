"use client";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center " >
        <div className=" p-12 mt-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
        
        <p className="font-black/15 text-md" >Please ! wait Loading Shops </p>
        </div>
    );
}