import { useState } from 'react';
import './style.css';

export default function ProfilePic(props) {
  const { image, size, alt } = props
  const [useAlt, setUseAlt] = useState(false)

  return (
    <div className={`profilePicContainer pfp-${size}`}>
      {useAlt ?
        <div className={`alt-img alt-${size}`} > <p>{alt}</p></div>
        :
        <img className="profilePic" src={image} alt="user avatar" onError={() => setUseAlt(true)} />
      }
    </div >
  );
}
