import { connectToDB } from "@/utils/database"
import User from "@/models/user";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {

    try{
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const moderatorId = searchParams.get("id");
        const user = await User.findById(moderatorId);
        if(!user) {
            return new NextResponse("User not found", {
                status: 404
            });
        }
        // console.log(user);

        return new NextResponse(JSON.stringify({user}), {
            status: 200,
        })
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Fetching User by email failed", {
            status: 500
        })
    }


    

}