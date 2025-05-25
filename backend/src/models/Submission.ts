import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Submission
export interface ISubmission {
  user: mongoose.Types.ObjectId; // Reference to User
  challenge: mongoose.Types.ObjectId; // Reference to Challenge
  submittedFlag: string;
  isCorrect: boolean;
  pointsAwarded: number;
  submittedAt: Date;
  // Potentially add fields like timeTaken, attempts if needed later
}

// Mongoose Document including ISubmission properties
export type ISubmissionDocument = ISubmission & Document;

// Interface for Submission model
export interface ISubmissionModel extends Model<ISubmissionDocument> {}

const SubmissionSchema: Schema<ISubmissionDocument, ISubmissionModel> = new Schema<ISubmissionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    challenge: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: [true, 'Challenge ID is required'],
      index: true,
    },
    submittedFlag: {
      type: String,
      required: [true, 'Submitted flag is required'],
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    pointsAwarded: {
      type: Number,
      required: true,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: 'submittedAt', updatedAt: false }, // Use submittedAt for createdAt, no separate updatedAt needed by default
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// Compound index to ensure a user submits for a challenge only once if needed, or for faster lookups.
// If multiple submissions are allowed, this unique index might be too restrictive.
// For now, let's assume multiple attempts are recorded as separate submissions.
// SubmissionSchema.index({ user: 1, challenge: 1 }, { unique: true }); 

const Submission = mongoose.model<ISubmissionDocument, ISubmissionModel>('Submission', SubmissionSchema);

export default Submission; 