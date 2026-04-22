// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quickcart-next" });

// ingest function to save user data to a database

export const syncUserCreation = inngest.createFunction(
    {
        id : 'sync-user-from-clerk'
    },
    { event : 'clerk/user.created'},
    async ({event}) => {
        const {id , first_name , last_name , email_addresses, image_url} = event.data;
        const userData = {
            _id : id,
            email : email_addresses[0].email_address,
            name : first_name + ' ' + last_name,
            imageUrl : image_url

        }
        await connectDb()
        await User.create(userData)
    }
)