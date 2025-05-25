import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Badge
export interface IBadge {
  name: string;
  description: string;
  iconUrl?: string; // URL to the badge image/icon
  criteria: string; // Description of how to earn the badge
  // Could also include criteriaType (e.g., POINTS_THRESHOLD, CHALLENGES_COMPLETED) and criteriaValue
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Document including IBadge properties
export type IBadgeDocument = IBadge & Document;

// Interface for Badge model
export interface IBadgeModel extends Model<IBadgeDocument> {}

const BadgeSchema: Schema<IBadgeDocument, IBadgeModel> = new Schema<IBadgeDocument>(
  {
    name: {
      type: String,
      required: [true, 'Badge name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Badge description is required'],
      trim: true,
    },
    iconUrl: {
      type: String,
      // validate: { validator: (v: string) => validator.isURL(v), message: 'Invalid URL for icon' } // Example validation
    },
    criteria: {
      type: String,
      required: [true, 'Criteria for earning the badge is required'],
    },
    // Example for more structured criteria:
    // criteriaType: { type: String, enum: ['POINTS', 'CHALLENGES', 'SPECIFIC_CHALLENGE'] },
    // criteriaValue: { type: Schema.Types.Mixed }, // Can be number, string array of challenge IDs etc.
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

const Badge = mongoose.model<IBadgeDocument, IBadgeModel>('Badge', BadgeSchema);

export default Badge; 