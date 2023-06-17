import { model, Schema } from "mongoose";

const jobsSchema = new Schema({
    job: String,
    company: String,
    avatar: String,
    description: String,
    modality: String,
    workday: String,
    country: String,
    city: String,
    salary: String
}, 
{
    timestamps: true,
    versionKey: false
});

const Jobs = model('Jobs', jobsSchema);

export default Jobs;