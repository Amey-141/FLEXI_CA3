import Booking from '../models/Booking.js'; import Flight from '../models/Flight.js'; import Payment from '../models/Payment.js'; import { AppError, asyncHandler, reference } from '../utils/appError.js';
export const simulatePayment = asyncHandler(async (req, res) => {
  const { bookingId, paymentMethod, simulateFailure } = req.body; const booking = await Booking.findOne({ _id: bookingId, userId: req.user.id });
  if (!booking) throw new AppError('Booking not found.', 404); if (booking.paymentStatus === 'paid') throw new AppError('This booking has already been paid.', 409); if (booking.bookingStatus === 'cancelled') throw new AppError('Cancelled bookings cannot be paid.', 422);
  if (simulateFailure) { booking.paymentStatus = 'failed'; await booking.save(); await Payment.create({ bookingId, paymentReference: reference('PAY'), amount: booking.totalAmount, paymentMethod, status: 'failed' }); throw new AppError('The demonstration payment was declined. Please try again.', 402); }
  const flight = await Flight.findOneAndUpdate({ _id: booking.flightId, availableSeats: { $gte: booking.passengerCount } }, { $inc: { availableSeats: -booking.passengerCount } }, { new: true });
  if (!flight) throw new AppError('Sorry, seats just sold out for this demonstration flight.', 409);
  booking.paymentStatus = 'paid'; booking.bookingStatus = 'confirmed'; await booking.save(); const payment = await Payment.create({ bookingId, paymentReference: reference('PAY'), amount: booking.totalAmount, paymentMethod, status: 'success' });
  res.json({ success: true, booking, payment, message: 'Simulated payment successful.' });
});
export const paymentById = asyncHandler(async (req, res) => { const payment = await Payment.findById(req.params.id).populate('bookingId'); if (!payment || String(payment.bookingId.userId) !== req.user.id) throw new AppError('Payment not found.', 404); res.json({ success: true, payment }); });
