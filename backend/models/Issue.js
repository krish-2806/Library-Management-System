import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    source: {
      type: String,
      default: "manual",
    },
    bookCode: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
    },
    issuedOn: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    returnedOn: {
      type: String,
      default: null,
    },
    fineRate: {
      type: Number,
      default: 10,
    },
    fineInterval: {
      type: String,
      default: "day",
    },
    manualFine: {
      type: Number,
      default: 0,
    },
    fineCleared: {
      type: Boolean,
      default: false,
    },
    clearedFineAmount: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
    },
    stream: {
      type: String,
    },
    year: {
      type: String,
    },
    semester: {
      type: String,
    },
    rollNumber: {
      type: String,
    },
    studentId: {
      type: String,
    },
},{
    timestamps: true
});

export default mongoose.model("Issue", issueSchema);