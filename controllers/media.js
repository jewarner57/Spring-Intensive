const Media = require('../models/media')

// SAVE MEDIA
exports.savemedia = async (req, res) => {
  // Send a relevant error if no hash is provided
  if (!req.body.location) { return res.status(409).send({ msg: 'No media location provided' }) }

  // create the media
  const newmedia = new Media({ location: req.body.location, author: req.user._id })

  // if an identical media already exists then return an error
  const alreadyExists = await Media.findOne({ location: req.body.hash, author: req.user._id })
  if (alreadyExists) { return res.status(409).send({ msg: 'Media Already Saved' }) }

  // save the media and return its location
  try {
    const media = await newmedia.save()
    res.send({ msg: 'Media Saved Successfully', hash: media.location })
  } catch (err) {
    res.send({ msg: 'Media could not be saved', hash: '', err })
  }
}

// GET MEDIA
exports.getmedia = async (req, res) => {
  const mediaID = req.params.id

  try {
    const media = await Media.findOne({ _id: mediaID })
    if (media) { res.send({ location: media.location, author: media.author }) }
  } catch (err) {
    res.status(404).send({ msg: 'unable to find post', err })
  }
}
