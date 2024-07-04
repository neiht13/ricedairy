import { parse } from "@/lib/middleware/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { unstable_getServerSession } from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);
  // @ts-ignore
  const session = await unstable_getServerSession(req, null, authOptions)
  // if there's no session and the path isn't /login or /register, redirect to /login
  // @ts-ignore
  if (
  !session?.user &&
    path !== "/login" &&
    path !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL(
        `/login`,
        req.url,
      ),
    );

    // if there's a session
  }

  // otherwise, rewrite the path to /app
  return NextResponse.rewrite(
    new URL(fullPath, req.url),
  );
}
