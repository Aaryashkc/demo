import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: {
      type: String
    },
    address: {
      type: String
    }
  },
  location: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    address: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ["USER", "ORG_ADMIN", "DRIVER", "SUPER_ADMIN"],
    default: "USER"
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
