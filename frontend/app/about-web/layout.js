import { getMeServer } from '@/services/serverServices';
import React from 'react'
import HomeNavBar from '../components/HomeNavBar';

export default async function layout({children}) {

    let user = null;
      try {
    
        user = await getMeServer();
       
      } catch (err) {
        console.log("error in About-Web HomePage:-",err)
    
      }
    
      if (!user?.success) {
        redirect("/login")
      }


  return (
    <>
    <HomeNavBar user={user} />
     {children}
    </>
  )
}
