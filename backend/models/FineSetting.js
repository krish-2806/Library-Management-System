import mongoose from 'mongoose';

const fineSettingSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default: 10
    },
    interval: {
        type: String,
        default: "day"
    }
},{
    timestamps: true
});

export default mongoose.model("FineSetting", fineSettingSchema);