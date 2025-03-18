import { Webhook } from "svix";
import UserModel from "../model/UserModel.js";

export const clerkWebHooksController = async(req, res) =>{
    try{
        const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await webHook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body
        switch(type){
            case "user.created":
                const newUser = UserModel({
                    _id: data.id,
                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                })
                await newUser.save()
                return res.status(200).json({})   
            case "user.updated":
                await UserModel.findByIdAndUpdate(data.id, {
                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }, {new: true})
                return res.status(200).json({}) 
            case "user.deleted":
                await UserModel.findByIdAndDelete(data.id)
                return res.status(200).json({}) 
            default:
                break
        } 
    }
    catch(err){
        console.log(`Error in Clerk Web Hooks Controller - ${err.message}`)
        return res.status(500).json({message: "Internal Server Error", error: err.message})
    }
}