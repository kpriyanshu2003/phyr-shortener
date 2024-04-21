import { getLink } from "@/prisma/link";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }) {
  let pid = params.pid.replace("%40", "@");
  let data = await getLink(pid);
  if (data.link) {
    if (data.link.password) {
      if (data.link.password.length == 0) {
        return redirect(data.link.url);
      } else {
        return <div>Enter password</div>;
      }
    } else {
      return redirect(data.link.url);
    }
  } else {
    return <div>Link not found</div>;
  }
}

export default page;
