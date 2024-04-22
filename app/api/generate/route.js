import { CreateLink } from "@/prisma/cmd";

export async function POST(req) {
  let data = await req.json();
  if (!data.url || !data.ipAddr)
    return Response.json({
      success: false,
      message: "Missing required fields",
    });

  // TODO : Handle Errors
  const { success, link, message } = await CreateLink(JSON.stringify(data));
  return Response.json({
    success,
    link,
    message,
  });
}
