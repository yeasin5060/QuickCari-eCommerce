import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId : {type : String , required : true , ref : 'user'},
    name : {type : String , required : true},
    description : {type : String , required : true},
    price : {type : Numberg , required : true},
    offerPrice : {type : Numberg , required : true},
    image : {type : Array , required : true},
    category : {type : String , required : true},
    date : {type : Numberg , required : true},
});

const Product = mongoose.models.product || mongoose.model('product' , productSchema);

export default Product