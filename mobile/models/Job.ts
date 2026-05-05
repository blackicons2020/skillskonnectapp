import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  service: { type: String, required: true },
  category: String,
  location: String,
  state: String,
  city: String,
  budget: Number,
  budgetType: { type: String, default: 'Fixed', enum: ['Hourly', 'Daily', 'Monthly', 'Fixed'] },
  startDate: String,
  endDate: String,
  postedDate: { type: String, default: () => new Date().toISOString() },
  clientId: { type: String, required: true },
  clientName: String,
  clientEmail: String,
  status: { type: String, default: 'Open', enum: ['Open', 'In Progress', 'Completed', 'Cancelled'] },
  visibility: { type: String, default: 'Subscribers Only', enum: ['Public', 'Subscribers Only'] },
  requirements: [String],
  selectedWorkerId: String,
  applicants: [{
    workerId: String,
    workerName: String,
    workerEmail: String,
    positionApplied: String,
    proposal: String,
    proposedPrice: Number,
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
  }],
  assignedWorker: {
    workerId: String,
    workerName: String,
    workerEmail: String
  }
}, { timestamps: true });

export const Job = mongoose.model('Job', JobSchema);
