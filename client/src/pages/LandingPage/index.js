import React, { useState, useEffect } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import './style.css';

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(4)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)
    setError()

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/media/get/${start}/${end}`, {
        method: 'GET',
        credentials: 'include'
      })

      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(res.msg)
      }
      // set the content and leave loading state
      const prev = posts
      setPosts([...prev, ...content.media])
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      setError(err.message)
      throw new Error(err.message)
    }
  }

  return (
    <div className="landing-page">
      <div className="post-list">
        {error ? <p className="error">{error}</p> : ""}
        {loading ? <LoadingCircle />
          :
          <PostList posts={posts} />
        }
      </div>
    </div>
  );
}