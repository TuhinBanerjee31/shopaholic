import { connect } from "@/db/connection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//DB CONNECTED
connect();

//POST METHOD FOR LOGIN ROUTE
export async function POST(request: NextRequest) {
  try {

    //DATA EXTRACTION FROM THE REQUEST BODY
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //IF USER NOT ACCOUNT EXIST, WE RETURN 400 RESPONSE
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    //PASSWORD VERIFICATION
    const matched = await bcryptjs.compare(password, user.password);
    if(!matched) {
        return NextResponse.json({error: "Invalid Password"}, {status: 400})
    }

    //ACCOUNT/USER NOT VERIFIED
    // if(!user.isVerified) {
    //   console.log("Unauthorized to login")
    //   return NextResponse.json({error: "Unauthorization"}, {status: 400});
    // }

    //PAYLOAD DATA
    const payload = {
        id: user._id,
        email: user.email
    }

    //TOKEN CREATION
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    //STORING RESPONSE
    const resp = NextResponse.json({
        message: "Login Successful",
        success: true,
    })

    //SETTING TOKEN IN USER COOKIES
    resp.cookies.set("token", token, {httpOnly: true})

    //RETURNING RESPONSE
    return resp;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
