import { createLink } from "@/prisma/cmd";
import { checkRegex } from "@/utils/validateURL";

export async function POST(req) {
  let data = await req.json();
  let publicIP =
    req.headers.get("x-forwarded-for") || req.connection.remoteAddress;
  if (!data.url)
    return Response.json({
      success: false,
      message: "Missing required fields. URL",
    });
  if (checkRegex(data.url) === false)
    return Response.json({ success: false, message: "Invalid URL" });
  if (data.publicId && data.publicId.length > 6)
    return Response.json({ success: false, message: "Public ID too long" });
  if (data.password && data.password.length < 6)
    return Response.json({ success: false, message: "Password too short" });

  // TODO : Handle Errors
  const { success, link, message } = await createLink(
    JSON.stringify({
      url: data.url,
      ipAddr: publicIP,
      publicId: data.publicId,
      password: data.password,
    })
  );
  return Response.json({
    success,
    link,
    message,
  });
}
