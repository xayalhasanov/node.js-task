
import {Schema,model } from "mongoose";

const carSchema = new Schema ({
    brandName : String,
    modelName : String,
    year : Number,
    color : String,
    isBrandNew : Boolean
})





export const carModel =model("cars",carSchema)