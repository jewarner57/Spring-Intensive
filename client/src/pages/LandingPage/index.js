import React, { useState, useRef, useCallback } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import useApi from '../../hooks/useApi';
import caughtUp from '../../images/finish-line.svg'
import './style.css';

export default function LandingPage() {
  const [sort, setSort] = useState('newest')
  const [limit, setLimit] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const postLoadAmount = 20
  const [posts, setPosts] = useState([])
  const { loading, error, fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/media/get/${limit}/${limit + postLoadAmount}/${sort}`, true)

  const observer = useRef()
  const loader = useCallback(node => {
    if (loading || error) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        getPosts()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, error])

  const getPosts = async () => {
    setLimit((prev) => prev + postLoadAmount)
    const { data } = await fetchApi()

    if (data?.media) {
      setPosts((prev) => [...prev, ...data.media])
      setHasMore(data.media.length > 0)
    }
  }

  return (
    <div className="landing-page">
      <div className="post-list">
        <PostList posts={posts} />
        {error ?
          <p className="landing-error-text">{error}</p>
          : ""}
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