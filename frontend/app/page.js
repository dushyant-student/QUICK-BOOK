import HomeNavBar from "./components/HomeNavBar";
import HomeHeroSection from "./components/HomeHeroSection";
import ShopCart from "./components/ShopCart";
import AutoRefresh from "./components/AutoRefresh";
import { getMeServer, myShopData } from "@/services/serverServices";



export default async function Home() {

  let user = null;

  try {

    user = await getMeServer();
    
    user = user?.user || user?.user?._id ||  null;
    
  } catch (err) {
    // console.log("Err in NavB",err)
  }

  
  return (
   
    <main className="min-h-screen bg-white">
      <AutoRefresh/>
      <HomeNavBar user={user} />
      <HomeHeroSection/>
      <div className=" w-full h-screen flex justify-center gap-5 " >
        
        <ShopCart/>
      
      </div>

      
    </main>
  
  );
}
