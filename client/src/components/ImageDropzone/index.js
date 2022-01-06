import './style.css';
import imageUpload from '../../images/image-upload.svg'

export default function ImageDropzone(props) {

  const { image, setImage } = props

  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragEnter = (e) => {
    e.preventDefault();
  }

  const dragLeave = (e) => {
    e.preventDefault();
  }

  const fileDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0])
  }

  return (
    <div className="upload-drop-container"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <img className="upload-image" src={imageUpload} alt="person standing next to black hole" />
      <div className="upload-target">
        <p>Drop Image Here</p>
      </div>
    </div>
  );
}





