const Comment = require('../models/comment')

// CREATE A COMMENT
exports.createComment = async (req, res) => {
  const userId = req.user

  const postId = req.body.post_id
  if (!postId) { return res.status(401).send({ msg: 'Missing Post ID' }) }

  const { content } = req.body
  if (!content) { return res.status(401).send({ msg: 'Comments cannot be blank' }) }

  // Create a new like for this post
  const newComment = new Comment({ user: userId, media: postId, content })
  try {
    await newComment.save()
    return res.send({ comment: newComment })
  } catch (err) {
    return res.status(500).send({ msg: 'Could not create comment', err })
  }
}

// GET COMMENTS FOR POST_ID
exports.getCommentsForPost = async (req, res) => {
  const mediaId = req.params.id
  if (!mediaId) { return res.status(409).send({ msg: 'Missing Post ID' }) }
  const userId = req.user._id

  try {
    const comments = await Comment.find({ media: mediaId, user: userId })
    return res.send({ comments })
  } catch (err) {
    return res.status(500).send({ msg: 'Could not get post comments', err })
  }
}
