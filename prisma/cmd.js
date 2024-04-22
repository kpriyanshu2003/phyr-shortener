"use server";

import bcrypt from "bcrypt";
import randomString from "randomstring";
import prisma from "./prisma";

const checkUnique = async (id, type) => {
  if (type === 0) {
    const link = await prisma.link.findUnique({ where: { publicId: id } });
    return link ? await checkUnique(randomString.generate(6)) : id;
  } else if (type === 1) {
    const link = await prisma.link.findUnique({ where: { analyticsId: id } });
    return link ? await checkUnique(randomString.generate(6)) : id;
  }
};

export const createLink = async (formData) => {
  let { url, publicId, ipAddr, password } = JSON.parse(formData);
  try {
    const link = await prisma.link.create({
      data: {
        url: url,
        publicId: publicId || (await checkUnique(randomString.generate(6), 0)),
        ipAddr: ipAddr,
        analyticsId: await checkUnique(randomString.generate(6), 1),
        password: password ? await bcrypt.hash(password, 10) : null,
      },
    });
    console.log("link", link);
    return {
      success: true,
      link,
      message: "Link created successfully",
    };
  } catch (e) {
    console.error(e);
    if (e.code === "P2002")
      return { success: false, message: "Custom alias exists" };
    return { success: false, message: e.message };
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
