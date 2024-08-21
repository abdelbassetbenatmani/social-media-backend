import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL as string;
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;