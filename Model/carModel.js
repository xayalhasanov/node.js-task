
import { Schema, model } from "mongoose";

const carSchema = new Schema({
    brandName: String,
    modelName: String,
    year: Number,
    color: String,
    isBrandNew: Boolean
}, {
    versionKey: false
})





export const carModel = model("cars", carSchema)