// challenge-history.schema.ts
import * as mongoose from 'mongoose';

export const ChallengeHistorySchema = new mongoose.Schema({
  challengeId: mongoose.Schema.Types.ObjectId,
  changes: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});