import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model (if you have one)
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        // You can add other item-specific details here, like size, color, etc.
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'], // Enforce valid status values
      default: 'Pending',
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    shippingMethod: {
        type: String,
    },
    trackingNumber: {
        type: String,
    },
    notes: {
        type: String,
    }
  }, {
    timestamps: true, // Adds createdAt and updatedAt fields
  });
  const OrderModel=mongoose.model("order",orderSchema);
  export default OrderModel;
