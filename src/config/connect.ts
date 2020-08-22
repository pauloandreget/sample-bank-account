import mongoose from 'mongoose';

export default (dbURL: string) => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('connected', () => {
    console.log('Successfully connected to database');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to database', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection has disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database has disconnected due to application termination');
      process.exit(0);
    });
  });
};
