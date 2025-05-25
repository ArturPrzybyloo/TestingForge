import mongoose, { Schema, Document, Model, HookNextFunction } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Interface for User document
export interface IUser {
  username: string;
  email: string;
  password: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  progress: {
    completedLessons: string[];
    currentLesson: string;
  };
  createdAt: Date; // Provided by timestamps
  updatedAt: Date; // Provided by timestamps
  // Methods that will be added to the schema
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// Mongoose Document including IUser properties
export type IUserDocument = IUser & Document;

// Interface for User model (for static methods, if any in future)
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema: Schema<IUserDocument, IUserModel> = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    progress: {
      completedLessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      }],
      currentLesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    },
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt fields
    // Ensure virtuals are included if you use them, e.g. for toJSON or toObject
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook to hash password
UserSchema.pre<IUserDocument>('save', async function (this: IUserDocument, next: HookNextFunction) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (this: IUserDocument, candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
UserSchema.methods.generateAuthToken = function (this: IUserDocument): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables.');
    throw new Error('JWT_SECRET is not defined. Unable to generate token.');
  }
  return jwt.sign({ _id: this._id.toString(), isAdmin: this.isAdmin }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User; 