const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lodash = require("lodash");
const { log } = require("winston");

class CodeService {


    static createCode = async ({ voucher_id, phone, number }) => {

        const codexValues = [];

        for (let i = 0; i < number; i++) {
            const newCodexValue = number + i;
            const newCodex = String(newCodexValue).padStart(4, '0');
            codexValues.push({ codex: newCodex, phone, voucher_id, is_used: 0, status: 0 });
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

 static   view = async (req, res) => {
        const code = await prisma.codex.findMany({
            orderBy: [{ created_at: "desc" }]
        });
        return {
            code: "00",
            message: "code is show all",
            data: code,
        }
    }
}

module.exports = CodeService;