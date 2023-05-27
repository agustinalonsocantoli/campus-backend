import { model, Schema } from "mongoose";

const lessonSchema = new Schema({
    lessonName: String,
    lessonTime: Number
});

const moduleSchema = new Schema({
    moduleName: String,
    lesson: [lessonSchema]
});

const coursesSchema = new Schema({
    name: String,
    modules: [moduleSchema],
    duration: String,
    imgUrl: String,
    type: String,
    description: String,
    prominent: Boolean
}, 
{
    timestamps: true,
    versionKey: false
});

const Courses = model('Courses', coursesSchema);

export default Courses;