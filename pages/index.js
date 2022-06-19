import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed/Feed'
import Header from '../components/Header'
import Login from '../components/Login/Login'
import Sidebar from '../components/Sidebar/Sidebar'


  export default function Home({session}) {
    if (!session) return <Login />;
  return (
    <div className="">
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />


      <main className='flex bg-gray-100'>
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}