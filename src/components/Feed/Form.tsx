import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';
import { useRef, useState } from "react";
import { db, storage } from "../../backend/Firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";


interface Props {
    username: string;
    bio: string;
    uri: string;
    tokenId: number | undefined;
}

const Form = ({uri, username, bio, tokenId}: Props) => {

    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string | null>("");
    const filePickerRef = useRef<any>(null);

    const sendPost = async (event: any) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "Posts"), {
            id: tokenId,
            username: username,
            profilePic: uri,
            postImage: selectedFile, //<------- Not sure if i need to send this to storage
            bio: bio,
            likes: 0,
            text: input,
            timestamp: serverTimestamp(),
      });
  
      const imageRef = ref(storage, `Posts/${docRef.id}/image`);//<----------Need to find an alternative variable for docRef.id
  
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          });
        });
      }
  
      setLoading(false);
      setInput("");
      setSelectedFile(null);
    };

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent: any) => {
          setSelectedFile(readerEvent.target.result);
        };
    };
    

  return (
    <form>
        <div className='flex flex-row p-1 pt-3 pr-3 pl-3 place-items-center select-none'>
            <img className='border border-gray-dark rounded-full w-7 h-7' alt='profilepic' src={uri}></img>
            <div className='flex flex-col pl-1 w-[12rem]'>
                <div>{username}</div>
                <div className='text-gray'>{bio}</div>
            </div>
            {selectedFile && (
            <div className="flex items-center justify-center">
                <div className="relative">
                <div
                    className="absolute w-4 h-4 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                >
                    <ImCancelCircle />
                </div>
                <img
                    src={selectedFile}
                    alt=""
                    className="rounded-2xl max-h-11 object-contain"
                />
                </div>
            </div>
            )}
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='...'
                maxLength={280}
                className='ml-2 p-1 text-white bg-transparent flex-grow ease-in duration-200 border border-gray-dark rounded-2xl scrollbar-hide overflow-y-none max-h-10 hover:bg-blackish'
            />
        </div>
        <div className='flex flex-row justify-end gap-3 pr-3 pb-1 border-b-[1px] border-gray-dark items-center'>
            <span
                onClick={() => filePickerRef.current.click()} 
                className='ease-in-out duration-700 hover:text-gray-dark cursor-pointer select-none'
            >
                <HiOutlinePhotograph className='text-2xl'/>
                <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
            </span>
            <button
                onClick={sendPost}
                disabled={!input && !selectedFile} 
                className='border border-gray-dark rounded-full pl-1 pr-1 pt-[1px] pb-[2px] items-center cursor-pointer select-none ease-in duration-200 hover:bg-[#1f6e1c]'
            >
            +
            </button>
        </div>
    </form>
  )
}

export default Form