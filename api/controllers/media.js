const Media = require('../models/media')
const Like = require('../models/like')

// SAVE MEDIA
exports.savemedia = async (req, res) => {
  // Send a relevant error if no hash is provided
  if (!req.body.title) { return res.status(409).send({ msg: 'Missing title' }) }
  if (!req.body.location) { return res.status(409).send({ msg: 'No media location provided' }) }

  // create the media
  const newmedia = new Media({
    location: req.body.location,
    author: req.user._id,
    title: req.body.title,
  })

  // if an identical media already exists then return an error
  const alreadyExists = await Media.findOne({ location: req.body.hash, author: req.user._id })
  if (alreadyExists) { return res.status(409).send({ msg: 'Media Already Saved' }) }

  // save the media and return its location

  try {
    const media = await newmedia.save()
    res.send({ msg: 'Media Saved Successfully', hash: media.location, id: media._id })
  } catch (err) {
    res.status(400).send({ msg: 'Media could not be saved', hash: '', err })
  }
}

// GET MEDIA BY ID
exports.getmediabyid = async (req, res) => {
  const mediaID = req.params.id

  try {
    const media = await Media.findOne({ _id: mediaID }).populate('author', 'username')
    if (media) {
      res.send({
        location: media.location,
        title: media.title,
        author: media.author,
        createdAt: media.createdAt,
      })
    }
  } catch (err) {
    res.status(404).send({ msg: 'Unable to find post.', err })
  }
}

// GET A USER'S MEDIA
exports.getusermedia = async (req, res) => {
  const mediaID = req.params.id

  try {
    const media = await Media.find({ author: mediaID }).populate('author', 'username')
    res.send({ media })
  } catch (err) {
    res.status(404).send({ msg: 'Unable to find user\'s posts.', err })
  }
}

// GET MEDIA
exports.getmedia = async (req, res) => {
  const { start, end } = req.params

  try {
    const media = await Media.find().sort({ createdAt: -1 }).populate('author', 'username').limit(Number(end))
    const mediaArr = media.slice(start, end)

    if (start > media.length) { return res.send({ media: [] }) }
    res.send({ media: mediaArr })
  } catch (err) {
    res.status(400).send({ msg: 'Unable to get posts', err })
  }
}

// LIKE A POST
exports.likeMedia = async (req, res) => {
  if (!req.body.post_id) { return res.status(409).send({ msg: 'Missing Post ID' }) }

  // If a like already exists then remove it
  const likeExists = await Like.findOne({ user: req.user._id, media: req.body.post_id })
  if (likeExists) {
    try {
      await Like.deleteOne({ user: req.user._id, media: req.body.post_id })
      return res.send({ msg: 'like removed' })
    } catch (err) {
      return res.status(401).send({ msg: 'Could not remove like.' })
    }
  }

  // Create a new like for this post
  const newLike = new Like({ user: req.user._id, media: req.body.post_id })
  try {
    await newLike.save()
    return res.send({ msg: 'post liked' })
  } catch (err) {
    return res.status(401).send({ msg: 'Could not like post.' })
  }
}
