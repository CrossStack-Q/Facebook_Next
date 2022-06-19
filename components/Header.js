import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid'
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon/HeaderIcon'
import { signOut ,useSession } from 'next-auth/react'

function Header() {
  // const {getSession} = useSession();
  const { data: session, status } = useSession()

  if (status === "authenticated") {

  return (
    <div className="sticky top-0 flex bg-white items-center p-2 lg:px-5 shadow-md z-50">
      {/* left */}
      <div className="flex">
        <div className="m-2">
          <Image
            src="https://links.papareact.com/5me"
            className=""
            width={40}
            height={40}
            layout="fixed"
          />
        </div>
          <Input
            placeholder="Search"
            className=""
            contentLeft={<SearchIcon className="w-7 h-7 text-gray-700" />}
          />
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className='flex items-center sm:space-x-2 justify-end'>
        {/* Profile pic */}
        <Image
        onClick={signOut}
        className="rounded-full cursor-pointer"
        src={session.user.image}
        width="40"
        height="40"
        layout='fixed' />

        <p className="font-semibold pr-3 whitespace-nowrap">{session.user.name}</p>
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  )
}
}

export default Header
