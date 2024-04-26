import { lookup } from "geoip-country";

export async function GET(req) {
  let ip = "103.161.223.11";
  let geo = lookup(ip);
  console.log(geo);
  return Response.json({});
}
