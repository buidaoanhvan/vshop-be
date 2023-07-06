const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lodash = require("lodash");
const qrCode = require("qrcode");
const path = require("path");

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

  static view = async ({ page }) => {
    const currentPage = page || 1;
    const listPerPage = 10;
    const offset = (currentPage - 1) * listPerPage;

    const code = await prisma.codex.findMany({
      skip: offset,
      take: listPerPage,
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

  static generateQRCode = async (codexValues) => {
    try {
      if (!Array.isArray(codexValues)) {
        codexValues = [codexValues]; // Convert single codex value to an array
      }

      const qrCodePromises = codexValues.map((codex) => {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "qrcodes",
          `${codex}.png`
        );
        console.log(filePath);
        return qrCode.toFile(filePath, codex);
      });

      await Promise.all(qrCodePromises);

      return codexValues.map(
        (codex) => process.env.PUBLIC_URL + `/qrcodes/${codex}.png`
      );
    } catch (error) {
      throw error;
    }
  };
  //     const existingCodexValues = await prisma.codex.findMany({
  //       where: { voucher_id },
  //       select: { codex: true },
  //     });

  //     const existingCodexSet = new Set(existingCodexValues.map((item) => item.codex));
  //     const codexValues = [];

  //     for (let i = 0; i < number; i++) {
  //       let newCodex = generateRandomCodex(existingCodexSet);
  //       existingCodexSet.add(newCodex);

  //       codexValues.push({
  //         codex: newCodex,
  //         phone,
  //         voucher_id,
  //         is_used: 0,
  //         status: 0,
  //       });
  //     }

  //     const batchSize = 5000;
  //     const totalBatches = Math.ceil(codexValues.length / batchSize);

  //     for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
  //       const startIndex = batchIndex * batchSize;
  //       const endIndex = Math.min((batchIndex + 1) * batchSize, codexValues.length);
  //       const batch = codexValues.slice(startIndex, endIndex);

  //       await prisma.codex.createMany({
  //         data: batch,
  //         skipDuplicates: true,
  //       });
  //     }

  //     return {
  //       code: '00',
  //       message: 'codex create success',
  //     };
  //   };

  //  generateRandomCodex = (existingCodexSet) => {
  //     const length = 4;
  //     const chars = '0123456789';
  //     let codex = '';

  //     for (let i = 0; i < length; i++) {
  //       const randomIndex = Math.floor(Math.random() * chars.length);
  //       codex += chars[randomIndex];
  //     }

  //     // Ensure uniqueness
  //     while (existingCodexSet.has(codex)) {
  //       codex = generateRandomCodex(existingCodexSet);
  //     }

  //     return codex;
  //   };
}

module.exports = CodeService;
