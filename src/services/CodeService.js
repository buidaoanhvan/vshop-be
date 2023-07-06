const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lodash = require("lodash");

class CodeService {
  static createCode = async ({ voucher_id, quantity }) => {
    if (quantity > 100000) {
      return {
        code: "02",
        message: `codex create max 100000`,
      };
    }

    const codex = [];
    const voucher = await prisma.vouchers.findFirst({
      where: {
        id: voucher_id,
      },
      include: {
        shops: true,
      },
    });

    if (!voucher) {
      return {
        code: "01",
        message: "Voucher và shop không hợp lệ",
      };
    }
    const shop_prefix = voucher.shops.name
      .substring(0, 3)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    //quy tắc tạo codex = 3 ký tự đầu của tên shop + timestamp + 10 só random
    for (let i = 0; i < quantity; i++) {
      codex.push({
        codex:
          shop_prefix.toUpperCase() +
          Date.now() +
          Math.floor(1000000000 + Math.random() * 9000000000),
        voucher_id: voucher.id,
        is_used: 0,
        status: 0,
      });
    }

    const batch = lodash.chunk(codex, 1000);
    let ok = 0;
    await Promise.all(
      batch.map(async (b) => {
        const { count } = await prisma.codex.createMany({
          data: b,
          skipDuplicates: true,
        });
        ok += count;
      })
    );

    return {
      code: "00",
      message: `codex create success ${ok} code`,
    };
  };

  static lastCodex = async () => {
    return await prisma.codex.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });
  };

  static view = async ({ page, voucher_id }) => {
    const currentPage = page || 1;
    const listPerPage = 10;
    const offset = (currentPage - 1) * listPerPage;

    const code = await prisma.codex.findMany({
      skip: offset,
      take: listPerPage,
      where: {
        voucher_id,
      },
    });

    return {
      code: "00",
      message: "code is show all",
      data: code,
      meta: {
        page: currentPage,
      },
    };
  };

  static detail = async ({ codex }) => {
    const voucher = await prisma.codex.findFirst({
      where: {
        codex,
      },
      include: {
        vouchers: true,
      },
    });

    if (!voucher) {
      return {
        code: "01",
        message: "code is null",
      };
    }

    return {
      code: "00",
      message: "code read ok",
      data: voucher,
    };
  };

  static used = async ({ codex }) => {
    const code = await prisma.codex.findFirst({
      where: {
        codex,
      },
    });

    if (!code) {
      return {
        code: "01",
        message: "code is null",
      };
    }

    const codeNew = await prisma.codex.update({
      where: {
        id: code.id,
      },
      data: {
        is_used: 1,
      },
    });

    if (!codeNew) {
      return {
        code: "02",
        message: "code is false",
      };
    }

    return {
      code: "00",
      message: "code used ok",
      data: codeNew,
    };
  };
}

module.exports = CodeService;
