import { connect } from "@/db/connection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//DB CONNECTED
connect();

//POST METHOD FOR ADD TO CART
export async function POST(request: NextRequest) {
  try {
    //DATA EXTRACTION FROM THE REQUEST BODY
    const reqBody = await request.json();
    const { product_id, product_name, product_photo, prices, quantity } = reqBody;

    //TAKING OUT EMAIL FROM COOKIES
    const token = request.cookies.get("token")?.value || "";
    const payload = jwt.verify(token, process.env.TOKEN_SECRET!);

    //IF TOKEN NOT FOUND
    if (!payload) {
      return NextResponse.json({ error: "TOKEN NOT FOUND" }, { status: 404 });
    }

    console.log("PAYLOAD: ", payload);

    //TOKEN FOUND THEN EXTRACT USER
    const user = await User.findOne({ email: payload.email });

    //ADDING DATA TO CART
    user.cart.push({ product_id, product_name, product_photo, prices, quantity });
    await user.save();

    //SUCCESS RESPONSE
    return NextResponse.json({
      message: "Added To Cart Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    //TAKING OUT EMAIL FROM COOKIES
    const token = request.cookies.get("token")?.value || "";
    const payload = jwt.verify(token, process.env.TOKEN_SECRET!);

    //IF TOKEN NOT FOUND
    if (!payload) {
      return NextResponse.json({ error: "TOKEN NOT FOUND" }, { status: 404 });
    }

    console.log("PAYLOAD: ", payload);

    //TOKEN FOUND THEN EXTRACT USER
    const user = await User.findOne({ email: payload.email });

    //RETURN RESPONSE
    return NextResponse.json({data: user.cart});
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
