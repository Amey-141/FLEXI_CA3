import Booking from '../models/Booking.js'; import Flight from '../models/Flight.js'; import { AppError, asyncHandler, reference } from '../utils/appError.js';
const makeFare = (flight, cabinClass, count) => { const baseFare = flight.cabinFares[cabinClass] * count; const taxes = Math.round(baseFare * 0.12 + 699 * count); return { baseFare, taxes, total: baseFare + taxes }; };
export const createBooking = asyncHandler(async (req, res) => {
  const { flightId, travelDate, returnDate, cabinClass, passengerDetails } = req.body;
  const flight = await Flight.findById(flightId); if (!flight) throw new AppError('That flight is no longer available.', 404);
  if (!Array.isArray(passengerDetails) || !passengerDetails.length) throw new AppError('Add at least one passenger.', 422);
  if (!flight.cabinFares[cabinClass]) throw new AppError('The selected cabin is unavailable.', 422);
  const fareBreakdown = makeFare(flight, cabinClass, passengerDetails.length);
  const snapshot = { flightNumber: flight.flightNumber, airline: flight.airline, origin: flight.origin, destination: flight.destination, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, duration: flight.duration, stops: flight.stops };
  const booking = await Booking.create({ bookingReference: reference('SR'), userId: req.user.id, flightId, flightSnapshot: snapshot, passengerDetails, travelDate, returnDate, cabinClass, passengerCount: passengerDetails.length, fareBreakdown, totalAmount: fareBreakdown.total });
  res.status(201).json({ success: true, booking });
});
export const myBookings = asyncHandler(async (req, res) => { const bookings = await Booking.find({ userId: req.user.id }).sort('-createdAt'); res.json({ success: true, bookings }); });
export const bookingById = asyncHandler(async (req, res) => { const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id }); if (!booking) throw new AppError('Booking not found.', 404); res.json({ success: true, booking }); });
export const cancelBooking = asyncHandler(async (req, res) => { const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id }); if (!booking) throw new AppError('Booking not found.', 404); if (booking.bookingStatus === 'cancelled') throw new AppError('This booking is already cancelled.', 409); if (booking.checkInStatus === 'checked_in') throw new AppError('Checked-in bookings cannot be cancelled in this demo.', 422); booking.bookingStatus = 'cancelled'; if (booking.paymentStatus === 'paid') { booking.paymentStatus = 'refunded'; await Flight.updateOne({ _id: booking.flightId }, { $inc: { availableSeats: booking.passengerCount } }); } await booking.save(); res.json({ success: true, booking, message: 'Booking cancelled and seat inventory released.' }); });
