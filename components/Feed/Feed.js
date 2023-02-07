import React from 'react'
import InputBox from './InputBox/InputBox'
import Posts from './Posts/Posts'
import Stories from './Stories/Stories'
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";



import { doc, getDoc } from "firebase/firestore";
function  Feed() {







  async function cort(){
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
  });}

  cort()








  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto'>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
        {/* Stories */}
        <Stories />
        {/* InputBox */}
        <InputBox />
        <Posts />
        {/* Posts   */}
      </div>
    </div>
  )
}

export default Feed





