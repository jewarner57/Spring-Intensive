const Media = require('../models/media')

// SAVE MEDIA
exports.savemedia = async (req, res) => {
  // Create User and JWT
  if (!req.body.location) { return res.status(409).send({ msg: 'Media Already Saved' }) }

  const newmedia = new Media({ location: req.body.location, author: req.user.id })

  const alreadyExists = await Media.findOne({ location: req.body.hash, author: req.user.id })
  if (alreadyExists) { return res.status(409).send({ msg: 'Media Already Saved' }) }

  try {
    const media = await newmedia.save()
    res.send({ msg: 'Media Saved Successfully', hash: media.location })
  } catch (err) {
    res.send({ msg: 'Media could not be saved', hash: '' })
  }
}

// GET MEDIA
exports.getmedia = (req, res) => {

}
