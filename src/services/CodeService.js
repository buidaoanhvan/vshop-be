const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lodash = require("lodash");
// const { log } = require("winston");
const qrCode = require('qrcode');
const path = require('path');

class CodeService {


  static createCode = async ({ voucher_id, firstCode, number }) => {

    const lastId = await this.lastCodex();
    let idCodex = 0;
    if (lastId) {
      idCodex = parseInt(lastId.id);
    }
    else {
      idCodex = 1;
    }
    const codexValues = [];

    for (let i = 0; i < number; i++) {
      const newCodexValue = idCodex + i;
      const newCodex = firstCode + String(newCodexValue).padStart(7, '0');
      codexValues.push({ codex: newCodex, voucher_id, is_used: 0, status: 0 });
    }

    const batchSize = 5000;
    const totalBatches = Math.ceil(codexValues.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min((batchIndex + 1) * batchSize, codexValues.length);
      const batch = codexValues.slice(startIndex, endIndex);

      await prisma.codex.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    return {
      code: "00",
      message: "codex create success",
      //data: code
    }
  };
  static lastCodex = async () => {
    return await prisma.codex.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });

  }




  static view = async (req, res) => {
    const code = await prisma.codex.findMany({
      orderBy: [{ created_at: "desc" }]
    });
    return {
      code: "00",
      message: "code is show all",
      data: code,
    }
  }

  static generateQRCode = async (codexValues) => {
    try {
      if (!Array.isArray(codexValues)) {
        codexValues = [codexValues]; // Convert single codex value to an array
      }

      const qrCodePromises = codexValues.map((codex) => {
        const filePath = path.join(__dirname, '..', '..', 'public', 'qrcodes', `${codex}.png`);
        console.log(filePath)
        return qrCode.toFile(filePath, codex);
      });

      await Promise.all(qrCodePromises);

      return codexValues.map((codex) => process.env.PUBLIC_URL + `/qrcodes/${codex}.png`);
    } catch (error) {
      throw error;
    }
  }


  // static createCode = async ({ voucher_id, phone, number }) => {
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