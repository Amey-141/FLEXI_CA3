import mongoose from 'mongoose';
const subscriberSchema = new mongoose.Schema({ email: { type: String, unique: true, required: true, lowercase: true, trim: true }, subscribedAt: { type: Date, default: Date.now } });
export default mongoose.model('NewsletterSubscriber', subscriberSchema);
