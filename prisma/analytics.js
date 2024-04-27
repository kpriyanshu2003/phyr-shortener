"use server";

import { link } from "@nextui-org/react";
import prisma from "./prisma";

export const getAnalytics = async (aid) => {
  try {
    const analytics = await prisma.analytics.findUnique({
      where: {
        analyticsId: aid,
      },
      select: {
        clicks: true,
        analytics: {
          select: {
            publicId: true,
            url: true,
          },
        },
      },
    });
    if (analytics) {
      return { success: true, analytics };
    } else {
      return { success: false, message: "No analytics found" };
    }
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export const deleteAnalytics = async (aid) => {
  try {
    await prisma.analytics.delete({
      where: {
        analyticsId: aid,
      },
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export const updateAnalytics = async (pid, country) => {
  try {
    let linkData = await prisma.link.findUnique({
      where: { publicId: pid },
      include: { analytics: true },
    });
    let analytics = linkData.analytics;

    if (!analytics) {
      analytics = await prisma.analytics.create({
        data: {
          clicks: 1,
          analyticsId: linkData.analyticsId,
          country: [country],
        },
      });
    } else {
      if (!linkData.analytics.country.includes(country)) {
        analytics = await prisma.analytics.update({
          where: { analyticsId: linkData.analyticsId },
          data: { clicks: { increment: 1 }, country: { push: country } },
        });
      } else {
        analytics = await prisma.analytics.update({
          where: { analyticsId: linkData.analyticsId },
          data: { clicks: { increment: 1 } },
        });
      }
    }
    return { success: true, analytics };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};
