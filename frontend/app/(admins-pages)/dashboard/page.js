
import React from 'react'
import Dashboard from './DashBoard'
import { getDashBordDetails } from '@/services/serverServices';

export default async function page() {
  let isloading = false;
  let details = [];

  try {
   
    details = await getDashBordDetails();


  } catch (err) {
    // console.log(err, "err in DashBoard Page")
  }


  return (
    <Dashboard details={details}  />
  )
}
