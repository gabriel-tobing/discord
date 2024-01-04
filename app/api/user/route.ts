import { NextResponse } from "next/server";

import { db } from "@/common/libs/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, name, username, password, monthBirth, dayBirth, yearBirth } = body;

    const existingUserByEmail = await db.profile.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        message: "Email is already registered.",
        status: 409,
      });
    }

    const existingUserByUsername = await db.profile.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json({
        message: "Username is unavailable. Try adding numbers, letters, underscores _, or periods.",
        status: 409,
      });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Must be at least 8 characters long", status: 400 });
    }

    const newProfile = await db.profile.create({
      data: {
        name: name,
        username: name,
        email: email,
        password: password,
        monthBirth: monthBirth,
        dayBirth: dayBirth,
        yearBirth: yearBirth,
      },
    });

    return NextResponse.json({ user: newProfile, status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
