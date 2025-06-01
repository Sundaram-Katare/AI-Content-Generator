import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    inputText: {type: String, required: true},
    generatedText: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
}, { collection: 'contents' });

const Content = mongoose.model("Content", contentSchema);
export default Content;