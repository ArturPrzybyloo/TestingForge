import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ChallengeType {
  UI = 'UI',
  API = 'API',
  PROMPT_ENGINEERING = 'PROMPT_ENGINEERING',
  AI_TEST_GENERATION = 'AI_TEST_GENERATION',
  // Add other types as needed
}

export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
}

// Interface for Challenge
export interface IChallenge {
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: DifficultyLevel;
  points: number;
  flag: string; // The correct answer/flag for the challenge
  content: string; // Detailed content, could be markdown, links to external apps, etc.
  hints?: string[];
  solution?: string; // Optional: detailed solution or guide
  prerequisites?: mongoose.Types.ObjectId[]; // IDs of challenges to be completed before this one
  unlocks?: mongoose.Types.ObjectId[]; // IDs of challenges unlocked by this one
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Document including IChallenge properties
export type IChallengeDocument = IChallenge & Document;

// Interface for Challenge model
export interface IChallengeModel extends Model<IChallengeDocument> {}

const ChallengeSchema: Schema<IChallengeDocument, IChallengeModel> = new Schema<IChallengeDocument>(
  {
    title: {
      type: String,
      required: [true, 'Challenge title is required'],
      trim: true,
      unique: true, // Assuming titles should be unique
    },
    description: {
      type: String,
      required: [true, 'Challenge description is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(ChallengeType),
      required: [true, 'Challenge type is required'],
    },
    difficulty: {
      type: String,
      enum: Object.values(DifficultyLevel),
      required: [true, 'Difficulty level is required'],
      default: DifficultyLevel.EASY,
    },
    points: {
      type: Number,
      required: [true, 'Points for the challenge are required'],
      min: [0, 'Points cannot be negative'],
      default: 10,
    },
    flag: {
      type: String,
      required: [true, 'Flag for the challenge is required'],
      trim: true,
      // Consider adding a select: false if you don't want to send it to client by default
    },
    content: {
      type: String,
      required: [true, 'Challenge content is required'],
    },
    hints: {
      type: [String],
      default: [],
    },
    solution: {
      type: String,
    },
    prerequisites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
    unlocks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// Indexing for frequent queries
ChallengeSchema.index({ type: 1, difficulty: 1 });
ChallengeSchema.index({ tags: 1 });

const Challenge = mongoose.model<IChallengeDocument, IChallengeModel>('Challenge', ChallengeSchema);

export default Challenge; 