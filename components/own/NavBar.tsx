import React from 'react'
import {Inter} from "next/font/google"
import { ToggleButton } from './ToggleBtn'
import { AccountDialogMenu } from './AccountDialog'

const inter =  Inter({weight:"400",subsets:["latin"]})

export default function NavBar() {
  return (
    <nav className={` ${inter.className} lg:w-full h-14 dark:bg-slate-900 bg-slate-100 text-black dark:text-white flex justify-between items-center px-5 py-2`}>
        <h1 className=' lg:text-lg dark:text-amber-200 text-yellow-800 font-thin'> Chease</h1>

         {/**  Account Dialog Box come here*/}
         <div>
          <AccountDialogMenu/>
         </div>
    </nav>
  )
}
