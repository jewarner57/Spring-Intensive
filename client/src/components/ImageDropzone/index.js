import './style.css';
import imageUpload from '../../images/image-upload.svg'
import { useState } from 'react';

export default function ImageDropzone(props) {

  const { image, setImage } = props
  const [animateTarget, setAnimateTarget] = useState(false)

  const dragOver = (e) => {
    e.preventDefault();
    setAnimateTarget(true)
  }

  const dragEnter = (e) => {
    e.preventDefault();
    setAnimateTarget(true)
  }

  const dragLeave = (e) => {
    e.preventDefault();
    setAnimateTarget(false)
  }

  const fileDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0])
    setAnimateTarget(false)
  }

  return (
    <div className="upload-drop-container"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <img className="upload-image" src={imageUpload} alt="person standing next to black hole" />
      <div className={animateTarget ? 'upload-target-animate' : 'upload-target'} onDragEnter={dragEnter}>
        {image ?
          <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="gray" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" /></svg>
          :
          <p>Drop Image Here</p>
        }
      </div>
    </div>
  );
}





