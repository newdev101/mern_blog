import { Button, TextInput } from 'flowbite-react'
import {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { set } from 'mongoose'

function DashProfile() {
     const { currentUser } = useSelector(state => state.user)
     const [imageFile, setImageFile] = useState(null)
     const [imageUrl, setImageUrl] = useState(null)
     const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
     const [imageFileUploadError, setImageFileUploadError] = useState(null);


     const filePickerRef = useRef()

     const handleImageChange = (e) => {
          const file= e.target.files[0];
          if(file) {
               const imageUrl = URL.createObjectURL(file)
               setImageUrl(imageUrl)
               setImageFile(file)
          }
     };
     
     useEffect(() => {
          if(imageFile){
               uploadImage();
          }
     }, [imageFile])

     const uploadImage = async () => {
          setImageFileUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime()+imageFile.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
          uploadTask.on(
               'state_changed',
               (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
               },
               (error)=>{
                    setImageFileUploadError('could not upload image (file must be less than 2mb)');
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageUrl(null);
               },
               ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                         setImageUrl(downloadURL);
                    })
               }

          );
     };

     return (
          <div className='max-w-lg mx-auto p-3 w-full'>
               <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
               <form className='flex flex-col gap-4'>

                    <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />

                    <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={()=>filePickerRef.current.click()}>

                         {imageFileUploadProgress && (
                              <CircularProgressbar value={imageFileUploadProgress || 0}
                              text={`${imageFileUploadProgress}%`}
                              strokeWidth={5}
                              styles={{
                                   root:{
                                        width:'100%',
                                        height:'100%',
                                        position:'absolute',
                                        top:0,
                                        left:0,
                                   },
                                   path:{
                                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                                   },
                                   
                                   
                              }}
                              />
                         )}
                         <img src={imageUrl || currentUser.profilePicture} alt='user'
                              className='rounded-full w-full h-full border-8 object-cover border-[lightgray]'
                         />
                    </div>
                    
                    {imageFileUploadError && <alert color='failure'>
                         {imageFileUploadError}
                    </alert>}
                    

                    <TextInput type='text' id='username' placeholder='username'
                    defaultValue={currentUser.username} />
                    <TextInput type='email' id='email' placeholder='email'
                    defaultValue={currentUser.email} />
                    <TextInput type='password' id='password' placeholder='password'
                    />

                    <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                         Update Profile
                    </Button>
               </form>

               <div className="text-red-500 flex justify-between mt-5">
                    <span className='cursor-pointer' >Delete Account</span>
                    <span className='cursor-pointer' >Signout</span>
               </div>
          </div>

     )
}

export default DashProfile