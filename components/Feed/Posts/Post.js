import React, { useEffect, useState } from 'react'
import {
  BookmarkIcon,
  BreakIcon,
  ChatAlt2Icon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase'

function Post({ id, username, userImg, img, message }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),

    [db, id]
  )
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.id) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.id))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.id), {
        username: session.user.name,
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment

    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="bg-white my-5 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={img} className="object-cover w-full" alt="" />

      {/* Caption  */}
      <div className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {message}
      </div>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll ">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                className="h-7 rounded-full"
                alt=""
              />
              <p className="flex-1 text-sm">
                <span className="mr-2 font-bold ">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              {/* 
              <Moment fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment> */}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-around items-center">
        <div className='flex items-center justify-center border rounded-full cursor-pointer border-white hover:bg-gray-200 hover:text-gray-700'>
        {
            hasLiked ? (
              <HeartIconFilled onClick={likePost} className="icon1 btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn icon1" />
            )
          }
          <p className='ml-2 mr-2'>Like</p>
        </div>

        <div className='flex items-center justify-center border rounded-full cursor-pointer border-white hover:bg-gray-200 hover:text-gray-700'>
          <ChatAlt2Icon className="icon1" />
          <p className='ml-2 mr-2'>Comment</p>
        </div>

        <div className='flex items-center justify-center border rounded-full cursor-pointer border-white hover:bg-gray-200 hover:text-gray-700'>
          <ShareIcon className="icon1" />
          <p className='ml-2 mr-2'>Share</p>
        </div>
      </div>

      <form action="" className="flex items-center p-4">
        <EmojiHappyIcon className="h-7 mr-2" />

        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className=" mr-2 bg-gray-50 rounded-md border-none flex-1 focus:ring-0 outline-none"
          placeholder="Add a comment"
        />
        <button
          className="font-semibold text-blue-400"
          type="submit"
          disabled={!comment}
          onClick={sendComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default Post
