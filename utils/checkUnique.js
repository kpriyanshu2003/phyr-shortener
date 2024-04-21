// Type 0 = PID
// Type 1 = AID

import randomString from "randomstring";

export const checkUnique = async (id, type) => {
  if (type === 0) {
    const link = await prisma.link.findUnique({ where: { publicId: id } });
    return link ? await checkUnique(randomString.generate(6)) : id;
  } else if (type === 1) {
    const link = await prisma.link.findUnique({ where: { analyticsId: id } });
    return link ? await checkUnique(randomString.generate(6)) : id;
  }
};
