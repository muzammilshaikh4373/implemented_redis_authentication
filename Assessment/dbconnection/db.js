import mongoose from "mongoose";

const dbConnection = async (dbname, dburl) => {
    try {
      await mongoose.connect(`${dburl}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`${dbname} Database connected successfully`);
    } catch (error) {
      console.error('Database connection failed:', error.message);
    }
  };

  export default dbConnection