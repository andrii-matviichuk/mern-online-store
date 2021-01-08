import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user'],
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, 'Order Item must have a name'],
        },
        quantity: {
          type: Number,
          required: [true, 'Order Item must have a quantity'],
        },
        image: {
          type: Number,
        },
        price: {
          type: Number,
          required: [true, 'Order Item must have a price'],
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'Order Item must have a product'],
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: [true, 'Shipping Address must have an address'],
      },
      city: {
        type: String,
        required: [true, 'Shipping Address must have a city'],
      },
      postalCode: {
        type: Number,
        required: [true, 'Shipping Address must have a postal code'],
      },
      country: {
        type: String,
        required: [true, 'Shipping Address must have a country'],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Order must have a payment method'],
    },
    paymentMethod: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: [true, 'Order must have a tax price'],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Order must have a shipping price'],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Order must have a total price'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'Order must have an isPaid property'],
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: [true, 'Order must have an isDelivered property'],
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
