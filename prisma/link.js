"use server";

import bcrypt from "bcrypt";
import prisma from "./prisma";

export const createLink = async (formData) => {
  let { url, publicId, ipAddr, password } = formData;
  password = password ? password.trim() : null;
  try {
    const link = await prisma.link.create({
      data: {
        url: url,
        publicId: publicId,
        ipAddr: ipAddr,
        password: password ? await bcrypt.hash(formData.password, 10) : null,
      },
    });
    return { success: true, link };
  } catch (e) {
    console.error(e);
    if (e.code === "P2002")
      return { success: false, error: "Public ID already exists" };
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
