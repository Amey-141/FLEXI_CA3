import mongoose from 'mongoose';
const airportSchema = new mongoose.Schema({ code: String, city: String }, { _id: false });
const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true, index: true },
  airline: { type: String, required: true },
  origin: { type: airportSchema, required: true }, destination: { type: airportSchema, required: true },
  departureTime: { type: String, required: true }, arrivalTime: { type: String, required: true }, duration: { type: String, required: true },
  stops: { type: Number, default: 0, min: 0 },
  cabinFares: { economy: { type: Number, required: true }, premiumEconomy: Number, business: Number },
  availableSeats: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['On time', 'Delayed', 'Boarding', 'Departed'], default: 'On time' }
}, { timestamps: true });
flightSchema.index({ 'origin.code': 1, 'destination.code': 1 });
export default mongoose.model('Flight', flightSchema);
