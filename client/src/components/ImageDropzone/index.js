import './style.css';
import imageUpload from '../../images/image-upload.svg'
import { useState } from 'react';

export default function ImageDropzone(props) {

  const { setImage } = props
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
        <p>Drop Image Here</p>
      </div>
    </div>
  );
}





