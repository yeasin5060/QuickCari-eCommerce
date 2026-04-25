import connectDb from "@/config/db";
import Address from "@/models/Address";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {userId} = getAuth(request);
        const {address} = request.json();

        await connectDb();
        const newAddress = await Address.create({...address , userId});

        return NextResponse.json({success : true , message : 'Address added successfully', newAddress})
    } catch (error) {
        return NextResponse.json({success : false , message :error.message})
    }
}