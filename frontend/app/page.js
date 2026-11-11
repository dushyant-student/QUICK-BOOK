import HomeNavBar from "./components/HomeNavBar";
import HomeHeroSection from "./components/HomeHeroSection";
import ShopCart from "./components/ShopCart";
import { getMeServer } from "@/services/serverServices";
import HomeRefresh from "./components/AutoRefresh";



export default async function Home() {

  let user = null;


  try {
     
    user = await getMeServer();
    
    user = user?.user || user?.user?._id ||  null;

    
  } catch (err) {
    // console.log("Err in NavBar",err)
  }


  
  return (
   
    <main className="min-h-screen bg-white">
      <HomeRefresh/>
      <HomeNavBar user={user} />
      <HomeHeroSection/>
      <div className=" w-full h-screen flex justify-center gap-5 " >
        
        <ShopCart/>
      
      </div>

      
    </main>
  
  );
}
