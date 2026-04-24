import connectDb from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        await connectDb()
        const product = await Product.find({});
        return NextResponse.json({success : true , product});
    } catch (error) {
         return NextResponse.json({success : false , message : error.message});
    }
}