export async function GET(req) {
  let publicIP =
    req.headers.get("x-forwarded-for") || req.connection.remoteAddress;
  return Response.json({ publicIP });
}
