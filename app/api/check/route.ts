import { NextResponse } from "next/server";

import { db } from "@/common/libs/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username } = body;

    if (username.length < 2 || username == undefined) {
      return NextResponse.json({
        message: "This must be 2-32 characters",
        status: 400,
      });
    }

    const existingUserByUsername = await db.profile.findUnique({
      where: {
        username: username,
      },
    });

    if (username.length > 2 && existingUserByUsername) {
      return NextResponse.json({
        message: "Username is unavailable. Try adding numbers, letters, underscores _, or periods.",
        status: 409,
      });
    } else {
      return NextResponse.json({ message: "Username is available. Nice!", status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
