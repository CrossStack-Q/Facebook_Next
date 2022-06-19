import React from 'react'
import InputBox from './InputBox/InputBox'
import Posts from './Posts/Posts'
import Stories from './Stories/Stories'
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";



import { doc, getDoc } from "firebase/firestore";
function  Feed() {


//   const docRef = doc(db, "posts","Value1");
//   const docSnap = await getDoc(docRef);

//    if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//   // doc.data() will be undefined in this case
//      console.log("No such document!");
// }





  async function cort(){
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
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





