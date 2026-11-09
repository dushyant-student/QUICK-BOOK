import Footer from "@/app/components/Footer";
import { getMeServer, myAllCustomers, myShopData } from "@/services/serverServices";
import Banner from "@/app/shopComponents/Banner";
import Profile from "@/app/shopComponents/Profile";
import ShowCustomers from "@/app/shopComponents/ShowCustomers";
import { CallStatusService } from "@/services/historyService";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import NaveBar from "@/app/shopComponents/NaveBar";
import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";



export default async function Page({ params }) {

    const { id } = await params;

    // Fetch all required data
    let customersdata = [];
    let currentStatus = null;
    let laoding = false;
    let ExistErr = false;
    let user = null;
    let myShopInfo = null;



    try {
        laoding = true;
        user = await getMeServer();

        user = user?.user ?? null;
        const userId = user?._id || null;

        //If Authinticate Actual User is Valid To access Own Shop
        if (id != userId) {
            return (
                <NotFound />
            )
        }


        // First fetch shop
        const response = await myShopData(userId);
        myShopInfo = response?.data?.[0] ?? null;


        // Fetch customers and status simultaneously
        const [customersResponse, statusResponse] =
            await Promise.all([

                myAllCustomers(userId),

                CallStatusService(userId),

            ]);

        customersdata = customersResponse?.data ?? [];
        currentStatus = statusResponse?.data ?? null;


    } catch (error) {
        ExistErr = true;
        //   console.error("Dashboard Error:", error);

    } finally {
        laoding = false;
    }




    if (ExistErr) {

        if (!user) {
            redirect("/login")
        }

        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4">

                <h1 className="text-2xl font-bold text-red-600">
                    Network Error!
                </h1>

                <p className="text-center text-slate-600">
                    Unable to fetch your shop data.
                    Please try again.
                </p>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                    Retry
                </button>

            </div>
        );
    }




    if (laoding) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold text-slate-600">
                    Loading your shop...
                </p>
                <LoadingSpinner />
            </div>
        );
    }




    return (
        <>
            <NaveBar user={user} myShopInfo={myShopInfo} />
            <div className="min-h-screen bg-slate-50 text-slate-800 mt-18">

                <main className="max-w-7xl mx-auto p-6">

                    {/* Banner */}
                    <Banner myShopInfo={myShopInfo} />


                    {/* Statistics */}
                    <section className="grid md:grid-cols-3 gap-5 mb-6">

                        <StatCard
                            icon="👥"
                            title="Total Clients"
                            value={currentStatus?.totalCount ?? 0}
                            text="Active clients"
                        />


                        <StatCard
                            icon="📅"
                            title="Today's Completed"
                            value={currentStatus?.CompletedCount ?? 0}
                            text={`I have ${currentStatus?.CompletedCount ?? 0} appointments today`}
                        />


                        <StatCard
                            icon="⏰"
                            title="Remaining Clients"
                            value={currentStatus?.waitingCount ?? 0}
                            text="Today's remaining customers"
                        />

                    </section>


                    {/* Customers and Profile */}
                    <div className="w-full flex flex-col justify-center gap-10 md:flex-row">
                        <ShowCustomers Customersdata={customersdata}/>
                        <Profile myShopInfo={myShopInfo}/>
                    </div>

                </main>


                <Footer />

            </div>
        </>
    );

}



// Statistics Card
function StatCard({ icon, title, value, text }) {

    return (

        <div className="bg-white border rounded-xl p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <div className="text-3xl px-4">
                    {icon}
                </div>

                <div className="flex flex-col items-center">

                    <p className="font-semibold">
                        {title}
                    </p>

                    <h3 className="text-3xl font-bold text-[#173454] mt-1">
                        {value}
                    </h3>

                </div>

            </div>

            <p className="text-sm text-slate-500 mt-3 pl-15">
                {text}
            </p>

        </div>

    );

}
