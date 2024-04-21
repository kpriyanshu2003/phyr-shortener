"use server";

import bcrypt from "bcrypt";
import randomString from "randomstring";
import { checkUnique } from "@/utils/checkUnique";
import prisma from "./prisma";

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

export const verifyPassword = async (publicId, password) => {
  try {
    const link = await prisma.link.findUnique({ where: { publicId } });
    if (await bcrypt.compare(password, link.password)) {
      return { success: true, url: link.url };
    } else {
      return { success: false, error: "Invalid password" };
    }
  } catch (e) {
    console.error(e);
    return { success: false, error: e.message };
  }
};
