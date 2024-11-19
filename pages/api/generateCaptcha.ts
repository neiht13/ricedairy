// pages/api/generateCaptcha.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { generateCaptcha } from "@/lib/captcha";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { question, token } = generateCaptcha();
    res.status(200).json({ question, token });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
