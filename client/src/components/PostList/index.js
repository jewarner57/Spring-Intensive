import React from 'react'
import PostCard from '../PostCard';
import './style.css';

export default function PostList(props) {
  const { posts } = props

  // Divide post content over the four columns
  // This is so that we can have grid items of different heights
  const getPostsForColumn = (colNum, colName, colCount) => {
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
      {getPostsForColumn(0, 'c1', 4)}
      {getPostsForColumn(1, 'c2', 4)}
      {getPostsForColumn(2, 'c3', 4)}
      {getPostsForColumn(3, 'c4', 4)}
    </div>
  );
}