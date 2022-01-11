import { useState, useRef } from 'react';
import ProfilePic from '../ProfilePic'
import './style.css';

export default function PfpModal(props) {
  const { open, setOpen } = props
  const [pfpFile, setPfpFile] = useState('')
  const [fileLink, setFileLink] = useState('')
  let uploadRef = useRef()

  const handleSave = () => {
    if (!pfpFile) {
      setOpen(false)
      return
    }

  }

  const uploadImage = (file) => {
    setFileLink(URL.createObjectURL(file))
    setPfpFile(file)
  }

  return (
    <>
      {
        open ?
          <div className="pfp-modal-wrapper">
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
                <div className="button-primary save-pfp" onClick={() => handleSave()}>Save</div>
              </div>
            </div>

          </div >
          : ""
      }
    </>
  );
}
