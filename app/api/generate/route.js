import { createLink } from "@/prisma/link";

export async function POST(req) {
  let data = await req.json();
  if (!data.url || !data.ipAddr)
    return Response.json({
      success: false,
      message: "Missing required fields",
    });

  // TODO : Handle Errors
  const result = createLink(data);
  return Response.json(result);
}
