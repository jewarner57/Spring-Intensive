const Media = require('../models/media')
const Like = require('../models/like')
const getSortObj = require('../util/getSortObj')

// SAVE MEDIA
exports.savemedia = async (req, res) => {
  // Send a relevant error if no hash is provided
  if (!req.body.title) { return res.status(400).send({ msg: 'Missing title' }) }
  if (!req.body.location) { return res.status(400).send({ msg: 'No media location provided' }) }
  if (!req.body.type) { return res.status(400).send({ msg: 'No media type provided' }) }

  // create the media
  const newmedia = new Media({
    location: req.body.location,
    author: req.user._id,
    title: req.body.title,
    type: req.body.type,
  })

  // if an identical media already exists then return an error
  const alreadyExists = await Media.findOne({ location: req.body.hash, author: req.user._id })
  if (alreadyExists) { return res.status(409).send({ msg: 'Media Already Saved' }) }

  // save the media and return its location

  try {
    const media = await newmedia.save()
    res.send({ msg: 'Media Saved Successfully', hash: media.location, id: media._id })
  } catch (err) {
    res.status(500).send({ msg: 'Media could not be saved', hash: '', err })
  }
}

// GET MEDIA BY ID
exports.getmediabyid = async (req, res) => {
  const mediaID = req.params.id
  console.log(mediaID)

  try {
    const media = await Media.findOne({ _id: mediaID }).populate('author', 'username profilepic')
    if (media) {
      return res.send({
        media,
      })
    }
    return res.status(404).send({ msg: 'No post found with that ID.', err })
  } catch (err) {
    return res.status(500).send({ msg: 'Server encountered an error finding post.', err })
  }
}

// GET A USER'S MEDIA
exports.getusermedia = async (req, res) => {
  const authorID = req.params.id
  let query = { author: authorID, private: false }

  try {
    // if this is the current user's profile, send their hidden posts
    if (authorID === req.user._id) {
      query = { author: authorID }
    }

    const media = await Media.find(query).populate('author', 'username profilepic')

    res.send({ media })
  } catch (err) {
    res.status(404).send({ msg: 'Unable to find user\'s posts.', err })
  }
}

// GET MEDIA
exports.getmedia = async (req, res) => {
  const { start, end, sort } = req.params
  const sortObj = getSortObj(sort)

  try {
    // Get all public posts within range start, end
    const media = await Media.find({ private: false }).sort(sortObj).populate('author', 'username profilepic').limit(Number(end))
    const mediaArr = media.slice(start, end)

    if (start > media.length) { return res.send({ media: [] }) }
    res.send({ media: mediaArr })
  } catch (err) {
    res.status(500).send({ msg: 'Unable to get posts', err })
  }
}

// LIKE A POST
exports.likeMedia = async (req, res) => {
  const mediaID = req.body.post_id
  if (!mediaID) { return res.status(400).send({ msg: 'Missing Post ID' }) }

  // If a like already exists then remove it
  const likeExists = await Like.findOne({ user: req.user._id, media: mediaID })
  if (likeExists) {
    try {
      await Like.deleteOne({ user: req.user._id, media: mediaID })
      await Media.findOneAndUpdate({ _id: mediaID }, { $inc: { likes: -1 } })
      return res.send({ liked: false })
    } catch (err) {
      return res.status(500).send({ msg: 'Could not remove like.' })
    }
  }

  // Create a new like for this post
  const newLike = new Like({ user: req.user._id, media: mediaID })
  try {
    await newLike.save()
    await Media.findOneAndUpdate({ _id: mediaID }, { $inc: { likes: 1 } })
    return res.send({ liked: true })
  } catch (err) {
    return res.status(500).send({ msg: 'Could not like post.' })
  }
}

// Is a post liked by the current user
exports.isLiked = async (req, res) => {
  const mediaId = req.body.post_id
  if (!mediaId) { return res.status(400).send({ msg: 'Missing Post ID' }) }
  const userId = req.user._id

  const isLiked = await Like.findOne({ user: userId, media: mediaId })
  res.send({ liked: Boolean(isLiked) })
}

exports.sharePostWithCommunity = async (req, res) => {
  const mediaId = req.body.post_id
  if (!mediaId) { return res.status(400).send({ msg: 'Missing Post ID' }) }
  const userId = req.user._id

  try {
    const mediaToShare = await Media.findOne({ _id: mediaId })

    // if the currentUser is the author
    if (String(mediaToShare.author) === String(userId)) {
      await Media.findOneAndUpdate({ _id: mediaId }, { $set: { private: false } })
      return res.send({ success: true })
    }
    return res.status(401).send({ success: false, msg: 'Cannot update other users posts.' })
  } catch (err) {
    return res.status(404).send({ success: false, msg: 'Post not found.', err })
  }
}