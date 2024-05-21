import { connect } from "@/db/connection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

//DB CONNECTED
connect();

//POST METHOD FOR SIGNUP ROUTE
export async function POST(request: NextRequest) {
  try {

    //DATA EXTRACTION FROM THE REQUEST BODY
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    //IF USER ACCOUNT EXIST, WE RETURN 400 RESPONSE
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //HASHING PASSWORD
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //SAVING USER DATA TO DB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //SHOOT VERIFICATION EMAIL
    // await sendEmail({email, emailType: "VERIFICATION", userId: savedUser._id})

    //SUCCESS RESPONSE
    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
