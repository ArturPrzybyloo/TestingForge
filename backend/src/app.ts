import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // To be created
import authRoutes from './routes/authRoutes'; // To be created
import challengeRoutes from './routes/challengeRoutes'; // To be created
import submissionRoutes from './routes/submissionRoutes'; // To be created
import adminRoutes from './routes/adminRoutes'; // To be created
import aiRoutes from './routes/aiRoutes'; // To be created
// import aiRoutes from './routes/aiRoutes'; // To be created

dotenv.config();

connectDB(); // Initialize DB Connection

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('QA Learning Platform API Running...');
});

// API Routes (To be uncommented once created)
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
// app.use('/api/ai', aiRoutes);

// Global Error Handler (Basic example, can be expanded)
interface HttpError extends Error {
  status?: number;
}

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({ message });
});

export default app; 