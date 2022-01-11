import { useState, useRef } from 'react';
import ProfilePic from '../ProfilePic'
import LoadingCircle from '../LoadingCircle'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'
import { create } from 'ipfs-http-client'
import './style.css';

export default function PfpModal(props) {
  const { open, setOpen, refetchUser } = props
  const [pfpFile, setPfpFile] = useState('')
  const [fileLink, setFileLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser, clearUser, getCurrentUser } = useAuth()
  const navigate = useNavigate()
  let uploadRef = useRef()
  const client = create('https://ipfs.infura.io:5001/api/v0')

  const uploadImage = (upload) => {
    setError()
    // is the file a valid upload?
    if (!isValidUploadFile(upload)) {
      // show an error
      setError('Please select an image.')
      return
    }
    setFileLink(URL.createObjectURL(upload))
    setPfpFile(upload)
  }

  const isValidUploadFile = (upload) => {
    // is the file an image
    const type = upload['type'].split('/')[0]
    return (type === 'image')
  }

  const handleSave = async (e) => {
    setError()

    if (!pfpFile) {
      setOpen(false)
      return
    }
    if (!currentUser) { navigate('/signin'); return }

    setLoading(true)

    try {
      // get the ipfs media hash
      const uploadLocation = await uploadFileToIPFS()
      // If location is empty stop the upload
      if (!uploadLocation) {
        setLoading(false)
        setError('Error uploading file.')
        return
      }

      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/profile/setpic`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: uploadLocation })
      });
      const content = await rawResponse.json();

      if (rawResponse.status === 401) {
        clearUser()
        navigate('/signin')
      }

      // If the response is not 200 throw an error
      if (rawResponse.status !== 200) {
        setError(content.err)
        throw new Error(content.err)
      }
      setLoading(false)
      await refetchUser()
      await getCurrentUser()
      setOpen(false)
      return
    }
    catch (err) {
      setLoading(false)
      setError(err.message)
      throw new Error(err.message)
    }
  }

  const uploadFileToIPFS = async () => {
    setError()
    // if the file isn't a valid upload
    if (!isValidUploadFile(pfpFile)) {
      // show an error
      setError('Please select an image or video.')
      return false
    }

    try {
      // upload the file and return the hash
      const added = await client.add(pfpFile)
      return added.path
    } catch (err) {
      setError('Error uploading file.')
      console.log(err)
    }
    return false
  }

  return (
    <>
      {
        open ?
          <div className="pfp-modal-wrapper">
            {loading ? <LoadingCircle />
              :
              <div className="pfp-modal">
                <div className="close-pfp-modal" onClick={() => setOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
                </div>
                <div className="pfp-body">
                  <p className='pfp-modal-title'> Change Avatar</p>

                  <input
                    ref={refParam => uploadRef = refParam}
                    id='pfp-upload-input'
                    type='file'
                    className="file-field"
                    onChange={(e) => uploadImage(e.target.files[0])}
                  />
                  <div className="pfp-preview" onClick={() => uploadRef.click()}>
                    <ProfilePic
                      image={fileLink}
                      size={'xlarge'}
                      alt={<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" viewBox="0 0 24 24"><path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z" /></svg>}
                    />
                  </div>
                  {error ? <p className='error-text error-text-pfp'>{error}</p> : ''}
                  <div className="button-primary save-pfp" onClick={() => handleSave()}>Save</div>
                </div>
              </div>
            }
          </div >
          : ""
      }
    </>
  );
}
