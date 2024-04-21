import PasswordForm from "@/components/Forms/PasswordForm";
import { getLink } from "@/prisma/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function page({ params }) {
  let pid = params.pid;
  pid = decodeURIComponent(pid);

  let data = await getLink(pid);
  if (data.link) {
    if (data.link.password) {
      if (data.link.password.length == 0) {
        return redirect(data.link.url);
      } else {
        return (
          <Suspense>
            <PasswordForm pid={pid} />;
          </Suspense>
        );
      }
    } else {
      return redirect(data.link.url);
    }
  } else {
    return <div>Link not found</div>;
  }
}

export default page;
