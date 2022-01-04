import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import './style.css';

export default function ViewPost() {
  const [loading, setLoading] = useState(true)
  const [postContent, setPostContent] = useState({})
  const { id } = useParams();

  useEffect(() => {
    getPost()
  }, [])

  const getPost = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/media/get/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        throw new Error(content.err)
      }
      // set the content and leave loading state
      setLoading(false)
      setPostContent(content)
    }
    catch (err) {
      setLoading(false)
      throw new Error(err.message)
    }
  }

  return (
    <div className="view-post-page" >
      {loading ?
        <LoadingCircle />
        :
        <div className="post-container">
          <div className="post-card">
            <div className="post-image-wrapper">
              <img src={`${process.env.REACT_APP_IPFS_READ_URL}${postContent.location}`} alt="Post Media" />
            </div>
          </div>
        </div>
      }
    </div >
  );
}
