import React, { useState, useEffect, useRef, useCallback } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import './style.css';

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()
  const [limit, setLimit] = useState(5)
  const loader = useRef(null);

  // Check if the loader div is intersecting the bottom of the screen
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      // Load more posts
      setLimit((prev) => prev + 5)
      getPosts()
      console.log(limit)
    }
  }, [limit]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    // When the user scrolls
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver])

  const getPosts = async () => {
    setError()

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/media/get/${limit}/${limit + 5}`, {
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
        <LoadingCircle />
        <div ref={loader}></div>
      </div>
    </div>
  );
}