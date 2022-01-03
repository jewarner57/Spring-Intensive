const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  password: { type: String, select: false },
  email: { type: String, required: true },
  createdChallenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
  solvedChallenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
}, { timestamps: true });

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function (next) {
  // ENCRYPT PASSWORD
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      console.log(err)
      next();
    });
  });
});

// Compare the password to the hash
UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
