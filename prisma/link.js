"use server";

import bcrypt from "bcrypt";
import prisma from "./prisma";
import randomString from "randomstring";
import { checkUnique } from "@/utils/checkUnique";

export const createLink = async (formData) => {
  let { url, publicId, ipAddr, password } = formData;
  try {
    const link = await prisma.link.create({
      data: {
        url: url,
        publicId: publicId || (await checkUnique(randomString.generate(6), 0)),
        ipAddr: ipAddr,
        analyticsId: await checkUnique(randomString.generate(6), 1),
        password: password ? await bcrypt.hash(formData.password, 10) : null,
      },
    });
    return { success: true, link };
  } catch (e) {
    console.error(e);
    if (e.code === "P2002")
      return { success: false, error: "Custom alias exists" };
    return { success: false, error: e.message };
  }
};

export const getLink = async (publicId) => {
  try {
    const link = await prisma.link.findUnique({ where: { publicId } });
    return { success: true, link };
  } catch (e) {
    console.error(e);
    return { success: false, error: e.message };
  }
};
