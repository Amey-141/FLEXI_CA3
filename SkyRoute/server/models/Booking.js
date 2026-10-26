import mongoose from 'mongoose';
const passengerSchema = new mongoose.Schema({ firstName: String, lastName: String, dateOfBirth: String, gender: String, passport: String }, { _id: false });
const bookingSchema = new mongoose.Schema({
  bookingReference: { type: String, unique: true, required: true, index: true }, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  flightSnapshot: { flightNumber: String, airline: String, origin: Object, destination: Object, departureTime: String, arrivalTime: String, duration: String, stops: Number },
  passengerDetails: { type: [passengerSchema], validate: v => v.length > 0 }, travelDate: { type: String, required: true }, returnDate: String,
  cabinClass: { type: String, enum: ['economy', 'premiumEconomy', 'business'], required: true }, passengerCount: { type: Number, required: true, min: 1 },
  fareBreakdown: { baseFare: Number, taxes: Number, total: Number }, totalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  bookingStatus: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  checkInStatus: { type: String, enum: ['not_checked_in', 'checked_in'], default: 'not_checked_in' }
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
