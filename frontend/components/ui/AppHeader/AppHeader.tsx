"use client";
import React from 'react';
import Link from 'next/link';
import MobileNav from '../MobileNav';
import { useUserContext } from '@/components/contexts/UserContext';

type Props = {}

const AppHeader = (props: Props) => {

  const { user } = useUserContext();

  React.useEffect(() => {
    console.log("userContext", user);
  }, [])

  return (
    <div className="flex justify-between items-center relative
        bg-gradient-to-r from-zinc-400 to-gray-950
        py-4 md:pl-8 md:pr-[3.6rem] px-8 w-full">
      <div className='w-full flex md:ml-0 md:w-full' >
        <Link href={'/'} className="flex justify-center items-center pl-6">
          <p className='text-2xl font-extrabold text-black'>Dev</p>
          <p className='text-2xl font-extrabold text-customCyan'>Element</p>
        </Link>
      </div>
      <div className="
        flex items-center w-full relative group
        justify-end
        ">
        <span className='md:hidden flex'>
          <MobileNav />
        </span>
        <span className='md:flex hidden cursor-pointer items-center gap-6 text-customCyan'>
          <Link 
          href={'/settings'} 
          className={`bg-customCyan rounded-full border-gray-800 border-4
            hover:bg-customCyanDark hover:border-gray-300`} >
            <img src={'../person.svg'} height={60} width={60} />
          </Link>
        </span>
      </div>
    </div>
  )
}

export default AppHeader