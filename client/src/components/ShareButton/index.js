import { useState } from 'react';
import './style.css';

export default function ShareButton(props) {
  const { post } = props
  const [menuOpen, setMenuOpen] = useState(false)

  // copy the ipfs media link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`)
  }

  const downloadMedia = async () => {
    let fileBlob = ''

    try {
      // Get the file response and create a blob
      const response = await fetch(`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`)
      fileBlob = await response.blob()
    }
    catch (err) {
      console.log(err)
      return
    }

    // Create a download link and click it
    const link = document.createElement("a");
    // Turn the blob into a file link (object url)
    link.href = URL.createObjectURL(fileBlob);
    link.download = `download.${post.type === 'video' ? 'mp4' : 'png'}`;
    link.click();
  };

  return (
    <div className="share-button" onClick={() => setMenuOpen(prev => !prev)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" fill={menuOpen ? '#dddddd' : 'gray'} viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" /></svg>
      <ul className="share-dropdown" style={{ display: !menuOpen ? 'none' : '' }}>
        <li className="share-dropdown-item" onClick={() => copyLink()}>
          Copy Link
        </li>
        <li className="share-dropdown-item" onClick={() => downloadMedia()}>
          Download
        </li>
      </ul>
    </div >
  );
}