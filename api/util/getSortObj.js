function getSortObj(sort) {
  switch (sort) {
    case 'newest':
      return { createdAt: -1 }
    case 'mostliked':
      return { likes: -1 }
    case 'mostcommented':
      return { comments: -1 }
    case 'hidden':
      return { private: -1, createdAt: -1 }
    case 'public':
      return { private: 1, createdAt: -1 }
    default:
      return { createdAt: -1 }
  }
}

module.exports = getSortObj
