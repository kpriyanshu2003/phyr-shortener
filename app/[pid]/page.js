/* eslint-disable react-hooks/rules-of-hooks */
import Invalid from "@/components/Forms/Invalid";
import PasswordForm from "@/components/Forms/PasswordForm";
import { updateAnalytics } from "@/prisma/analytics";
import { getLink } from "@/prisma/cmd";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function page({ params }) {
  let pid = params.pid;
  pid = decodeURIComponent(pid);

  let data = await getLink(pid);
  if (!data.link) return <Invalid />;

  let url = data.link.url;
  if (data.link.password && data.link.password.length > 0) {
    return (
      <Suspense>
        <PasswordForm pid={pid} />;
      </Suspense>
    );
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  return updateAnalytics(pid, "unknown")
    .then((res) => {
      if (res.success === false) console.error(res);
    })
    .catch((e) => console.error(e))
    .finally(() => redirect(url));
}

export default page;
