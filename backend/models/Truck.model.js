import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
  truckType: {
    type: String,
    enum: ["BIO", "NON_BIO"],
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },
  licensePlate: {
    type: String,
    required: true
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

truckSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;

