import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, index: true }, paymentReference: { type: String, unique: true, required: true },
  amount: { type: Number, required: true }, paymentMethod: { type: String, required: true }, status: { type: String, enum: ['success', 'failed'], required: true }
}, { timestamps: true });
export default mongoose.model('Payment', paymentSchema);
