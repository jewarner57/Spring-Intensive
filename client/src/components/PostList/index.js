import React from 'react'
import PostCard from '../PostCard';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './style.css';

export default function PostList(props) {
  const { posts } = props
  const { width } = useWindowDimensions()

  const getColCount = () => {
    return Math.round(width / 400)
  }

  // Divide post content over the four columns
  // This is so that we can have grid columns of different heights
  const getPostsForColumn = (colNum, colName) => {
    const colCount = getColCount()
    return (
      <div className="post-column" style={{ gridArea: colName }}>
        {posts.map((post, index) => {
          if (index % colCount === colNum) {
            return <PostCard key={post.location + index} post={post} index={index} />
          }
          return ""
        })}
      </div>
    )
  }

  return (
    <div className="post-container">
      {getPostsForColumn(0, 'c1')}
      {getPostsForColumn(1, 'c2')}
      {getPostsForColumn(2, 'c3')}
      {getPostsForColumn(3, 'c4')}
    </div>
  );
}