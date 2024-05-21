import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

//DB CONNECTED
connect();

//POST METHOD FOR VERIFY ROUTE (EMAIL VERIFICATION)
export async function POST(request: NextRequest) {
  try {
    //EXTRACTING TOKEN FROM REQUEST BODY
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("EMAIL VERIFICATION TOKEN", token);

    //FINDING USER ON BASIS OF TOKEN AND CONDITION
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    //INVALIDATION / TOKEN EXPIRED CASE
    if (!user)
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    console.log(user);

    //MARKING ACCOUNT VERIFIED AND REMOVING TOKEN STATUS
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    //SUCCESS RESPONSE
    return NextResponse.json({message: "Email Verified successfully",  success: true})

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
