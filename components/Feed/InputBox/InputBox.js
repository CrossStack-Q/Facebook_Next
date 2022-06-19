import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db, storage } from '../../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { getStorage } from 'firebase/storage'

import {
  Modal,
  Tooltip,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
} from '@nextui-org/react'

function InputBox() {
  const { data: session } = useSession()
  const filePickerRef = useRef(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedFile, setSelectrdFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    // Create a post and add data to it.
    // get post ID  of your newlu created value
    //  upload image to firestore with post id
    // get download url and update original post with url.

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.name,
      message: inputRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      }
    )

    setOpen(false)
    setLoading(false)
    setSelectrdFile(null)
    closeHandler()
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectrdFile(readerEvent.target.result)
    }
  }

  const Handler = () => {
    setVisible(true)
    console.log('closed')
  }

  const closeHandler = () => {
    setOpen(false), setVisible(false)
    console.log('closed')
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind ${session.user.name} ?`}
          />
          <button hidden onClick={uploadPost} type="submit">
            Submit
          </button>
        </form>

        {/* {selectedFile && (
          <div
            onClick={() => setSelectrdFile(null)}
            className="flexx flex-col filter hover:brightness-110 transition duration-150 hover: scale-105 cursor-pointer"
          >
            <img src={addImageToPost} className="h-10 object-contain" alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )} */}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon">
          <Button auto color={'#ffffff'} onClick={Handler}>
            <CameraIcon className="h-7 text-green-500 mr-2" />
            Photo/Only
          </Button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Upload Image
                <Text b size={18}>
                  <span className="ml-2">Link Only</span>
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              {selectedFile ? (
                <img
                  src={selectedFile}
                  onClick={() => setSelectrdFile(null)}
                  alt=""
                />
              ) : (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full cursor-pointer">
                  <div>
                    <input
                      ref={filePickerRef}
                      onChange={addImageToPost}
                      type="file"
                      hidden
                    />
                  </div>
                  <Button
                    auto
                    color="warning"
                    onClick={() => filePickerRef.current.click()}
                  >
                    Add Image
                  </Button>
                </div>
              )}

              <div>
                <input
                  ref={filePickerRef}
                  onChange={addImageToPost}
                  type="file"
                  hidden
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Remove
              </Button>
              <Button disabled={!selectedFile} auto onClick={uploadPost}>
                {loading ? 'Uploading' : 'Upload Post'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
