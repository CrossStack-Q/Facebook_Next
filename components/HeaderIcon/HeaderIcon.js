import React from 'react'

function HeaderIcon({Icon,active}) {
  return (
    <div className='flex cursor-pointer md:px-10 sm:h-12 text-gray-500 md:hover:bg-gray-100 hover:text-blue-500 rounded-2xl items-center
    active:border-b-2 active:border-blue-500  '>
        <Icon className={`h-5 sm:h-7 mx-auto ${active && "text-blue-500"}`} />
    </div>
  )
}

export default HeaderIcon