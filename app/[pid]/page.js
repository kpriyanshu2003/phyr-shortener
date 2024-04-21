import Invalid from "@/components/Forms/Invalid";
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
        let url = data.link.url;
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return redirect(url);
        } else {
          return redirect("http://" + url);
        }
      } else {
        return (
          <Suspense>
            <PasswordForm pid={pid} />;
          </Suspense>
        );
      }
    } else {
      let url = data.link.url;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return redirect(url);
      } else {
        return redirect("http://" + url);
      }
    }
  } else {
    return <Invalid />;
  }
}

export default page;
