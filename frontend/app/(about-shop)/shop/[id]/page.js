import { Bell, Store } from "lucide-react";
import DocterInfo from "../../../ComponentsClient.js/DocterInfo";
import TurnInfo from "../../../ComponentsClient.js/TurnInfo_C";
import Hero_C from "../../../ComponentsClient.js/Hero_C";
import Footer from "@/app/components/Footer";
import { ShopOwnerProfileById, myAllCustomers } from "@/services/serverServices";
import LoadingSpinner from "@/app/components/LoadingSpinner";


export default async function AppointmentPage({ params }) {
  let ShopOwnerInfo = [];
  let tableData = [];
  let loading = false;
  let ExistErr = false;

  
  let { id } = await params;
  let shopId = id;

  try {
    loading = true;

    const response = await ShopOwnerProfileById(shopId);
    
    ShopOwnerInfo = response?.data || [];

    const response2 = await myAllCustomers(shopId);
    tableData = response2 || [];
    loading = false;

  } catch (err) {
    // console.log(err,shopId)
    ExistErr = true;


  } finally {
    loading = false;

  }




  if (ExistErr) {

    return <div className="flex flex-col justify-center items-center mt-40" >
      <div className="flex h-30 w-30 items-center justify-center rounded-2xlbg-violet-50 text-violet-600 bg-gray-300 rounded-md">
        <Store size={100} />
      </div>

      <h2 className=" mt-5 text-xl font-bold text-slate-800 ">
        {
          ExistErr ?
            "Internet/Network Issue"
            :
            " No Shops Available"
        }
      </h2>

      <p className=" mt-2 max-w-md text-sm leading-6 text-slate-500">
        {
          ExistErr ?
            "Please! check Check Your Internet connection again later."
            :
            "There are currently no shops available. Please check again later."
        }
      </p>
    </div>

  }


  if (loading) {
    return <div className="mt-30"  >
      <LoadingSpinner />
    </div>
  }


  return (
    
    <div className="min-h-screen bg-[#f8fbff] text-[#102d57] pt-16 ">
      <main className="mx-auto max-w-365 px-5 py-6 lg:px-8">
        <Hero_C shopImg={ShopOwnerInfo.shopImage} shopId={ShopOwnerInfo?.shopId} openTime={ShopOwnerInfo?.openTime} closeTime={ShopOwnerInfo?.closeTime} />
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,2fr)_365px]">
          <TurnInfo TableData={tableData?.data} shopId={shopId} />
          <DocterInfo ShopOwnerInfo={ShopOwnerInfo} />
        </div>


        <section className="mt-5 flex items-center rounded-xl border border-blue-100 bg-gradient-to-r from-[#0b7bc5] to-[#f0faff] px-6 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Bell
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="font-bold text-blue-800">
              We will notify you when it&apos;s your turn.
            </p>

            <p className="text-sm text-[#a2c6f8]">
              Please keep this page open.
            </p>
          </div>

        </section>

      </main>





      <Footer />
    </div>
      
  );
}
