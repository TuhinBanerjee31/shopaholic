import { NextResponse } from "next/server";

//GET METHOD FOR LOGOUT ROUTE
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
