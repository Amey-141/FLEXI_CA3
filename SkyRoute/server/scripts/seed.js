import 'dotenv/config'; import { connectDb } from '../config/db.js'; import Flight from '../models/Flight.js';
const airports = { BOM: 'Mumbai', DEL: 'Delhi', BLR: 'Bengaluru', HYD: 'Hyderabad', MAA: 'Chennai', PNQ: 'Pune', NAG: 'Nagpur', CCU: 'Kolkata', GOI: 'Goa', AMD: 'Ahmedabad' };
const rows = [
 ['SR101','BOM','DEL','06:10','08:25','2h 15m',0,5299,7699,12499,42,'On time'], ['SR102','BOM','DEL','11:45','14:05','2h 20m',0,5899,8199,13299,28,'On time'], ['SR103','BOM','DEL','18:35','20:50','2h 15m',0,6499,8899,13999,16,'Delayed'],
 ['SR201','DEL','BLR','07:00','09:40','2h 40m',0,5599,7999,12999,36,'On time'], ['SR202','DEL','BLR','13:25','16:10','2h 45m',0,6199,8599,13699,21,'On time'], ['SR203','DEL','BLR','19:20','22:00','2h 40m',0,5799,8299,13499,30,'Boarding'],
 ['SR301','BLR','BOM','06:30','08:10','1h 40m',0,4899,7299,11999,44,'On time'], ['SR302','BLR','BOM','15:00','16:45','1h 45m',0,5499,7899,12799,25,'On time'],
 ['SR401','HYD','MAA','08:15','09:30','1h 15m',0,3899,5999,9999,38,'On time'], ['SR402','HYD','MAA','17:20','18:40','1h 20m',0,4299,6399,10499,19,'On time'],
 ['SR501','BOM','GOI','09:10','10:25','1h 15m',0,3699,5699,9499,48,'On time'], ['SR502','BOM','GOI','16:40','17:55','1h 15m',0,4199,6199,10299,34,'On time'],
 ['SR601','CCU','DEL','07:30','09:55','2h 25m',0,5799,8199,13299,32,'On time'], ['SR602','CCU','DEL','17:45','20:15','2h 30m',0,5399,7899,12699,27,'On time'],
 ['SR701','PNQ','DEL','10:00','12:10','2h 10m',0,5099,7499,12199,40,'On time'], ['SR801','AMD','BOM','12:20','13:45','1h 25m',0,3599,5499,9299,46,'On time'], ['SR901','NAG','HYD','14:10','15:25','1h 15m',0,3399,5299,8999,41,'On time'],
 ['SR104','DEL','BOM','09:15','11:30','2h 15m',0,5499,7899,12799,35,'On time'], ['SR204','BLR','DEL','12:00','14:40','2h 40m',0,5899,8299,13499,29,'On time'], ['SR503','GOI','BOM','18:20','19:35','1h 15m',0,3999,5999,9799,39,'On time']
];
const flights = rows.map(([flightNumber, from, to, departureTime, arrivalTime, duration, stops, economy, premiumEconomy, business, availableSeats, status]) => ({ flightNumber, airline: 'SkyRoute Air', origin: { code: from, city: airports[from] }, destination: { code: to, city: airports[to] }, departureTime, arrivalTime, duration, stops, cabinFares: { economy, premiumEconomy, business }, availableSeats, status }));
await connectDb(); await Promise.all(flights.map(f => Flight.updateOne({ flightNumber: f.flightNumber }, { $set: f }, { upsert: true }))); console.log(`Seeded ${flights.length} demonstration flights.`); process.exit(0);
