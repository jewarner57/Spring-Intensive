import React, { useState, useRef, useCallback } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import caughtUp from '../../images/finish-line.svg'
import './style.css';

export default function LandingPage() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()
  const [limit, setLimit] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const postLoadAmount = 20

  const observer = useRef()
  const loader = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        getPosts()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const getPosts = async () => {
    setError()
    setLoading(true)
    setLimit((prev) => prev + postLoadAmount)

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/media/get/${limit}/${limit + postLoadAmount}`, {
        method: 'GET',
        credentials: 'include'
      })

      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(res.msg)
      }
      // set the content and leave loading state
      setPosts((prev) => [...prev, ...content.media])
      setHasMore(content.media.length > 0)
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
        <PostList posts={posts} />
        {error ? <p className="error">{error}</p> : ""}
        {hasMore ?
          <LoadingCircle />
          :
          <div className="caughtup-container">
            <img className="caughtup-img" src={caughtUp} alt="person resting" />
          </div>
        }

        <div ref={loader}></div>
      </div>
    </div>
  );
}