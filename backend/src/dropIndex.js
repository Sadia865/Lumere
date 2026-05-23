import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected');

try {
  await mongoose.connection.collection('orders').dropIndex('orderNumber_1');
  console.log('✅ Index dropped successfully');
} catch (e) {
  console.log('Error (may not exist):', e.message);
}

await mongoose.disconnect();
process.exit(0);
