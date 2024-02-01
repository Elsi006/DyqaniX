const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      validate: [
        {
          validator: (val) => /^[a-zA-Z0-9_-]+$/.test(val),
          message:
            "Please enter a valid username (only alphanumeric characters, hyphens, and underscores are allowed)",
        },
        {
          validator: async (val) => {
            let foundUser = await mongoose.models.User.findOne({
              username: val,
            });
            return !foundUser;
          },
          message: "Ky user ekziston",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be 5 characters or longer"],
    },
  },
  { timestamps: true }
);
// add this after UserSchema is defined
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwordet duhet te perputhen");
  }
  next();
});

// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});



module.exports = mongoose.model("User", UserSchema);
