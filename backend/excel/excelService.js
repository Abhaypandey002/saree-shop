import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelDir = __dirname;
const workbookPath = path.join(excelDir, 'customer_inquiries.xlsx');

const defaultSheets = {
  Appointments: ['Name', 'Email', 'Phone', 'Preferred Date', 'Message', 'Created At'],
  Inquiries: ['Name', 'Email', 'Phone', 'Message', 'Created At']
};

export const ensureWorkbook = async () => {
  if (!fs.existsSync(excelDir)) {
    fs.mkdirSync(excelDir, { recursive: true });
  }

  if (!fs.existsSync(workbookPath)) {
    const workbook = new ExcelJS.Workbook();
    Object.entries(defaultSheets).forEach(([sheetName, headers]) => {
      const sheet = workbook.addWorksheet(sheetName);
      sheet.addRow(headers);
    });
    await workbook.xlsx.writeFile(workbookPath);
  }
};

const appendToSheet = async (sheetName, values) => {
  await ensureWorkbook();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  let worksheet = workbook.getWorksheet(sheetName);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(sheetName);
    const headers = defaultSheets[sheetName] || [];
    if (headers.length) {
      worksheet.addRow(headers);
    }
  }
  worksheet.addRow(values);
  await workbook.xlsx.writeFile(workbookPath);
};

export const appendAppointment = async ({ name, email, phone, date, message }) => {
  return appendToSheet('Appointments', [
    name,
    email,
    phone,
    date,
    message,
    new Date().toISOString()
  ]);
};

export const appendInquiry = async ({ name, email, phone, message }) => {
  return appendToSheet('Inquiries', [
    name,
    email,
    phone,
    message,
    new Date().toISOString()
  ]);
};

export const getWorkbookPath = () => workbookPath;
