import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quick-cart-app-next" });

// ✅ inngest function to the create a user
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDb();
    await User.create(userData);
  }
);

// ✅ inngest function to the Update user
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDb();
    await User.findByIdAndUpdate(id, userData);
  }
);

// ✅ Delete user
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDb();
    await User.findByIdAndDelete(id);
  }
);

// ✅ inngest function to create users order in database

export const createUserOrder = inngest.createFunction(
  {
    id : 'create-user-order',
    batchEvents : {
      maxSize : 5,
      timeout : '5s'
    },
    triggers: [{ event: "order/created" }],
  },

  async (events)=> {
    const orders = await events.map((event)=>{
      return {
        userId : event.data.userId,
        items : event.data.items,
        amount : event.data.amount,
        address : event.data.address,
        date : event.data.date
      }
    })
    await connectDb();
    await orders.insertMany(orders);

    return {success : true, processoed : orders.length}
  }

)