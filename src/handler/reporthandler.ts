import { Context } from "hono";
import { PDFDocument } from "pdf-lib";
import { db } from "../../lib/db";

export const get_report_handler = async (c: Context) => {
  // const { userId, Id } = c.req.query(); // Assuming you have a way to get userId and Id from the request
  try {
    // const result = await db`SELECT * FROM report WHERE user_id = ${userId} AND id = ${Id}`;
    // if (result.length === 0) {
    // return c.json({ message: "Report not found" }, 404);
    // }
    // const report = result[0];
    // Crate a PDF document
    const pdfDoc = await PDFDocument.create();
    // Add a page to the document
    // const page = pdfDoc.addPage([600, 400]);
    //page.drawText(report.content, { x: 50, y: 350 });
    const pdfBytes = await pdfDoc.save();
    return c.body(pdfBytes, 200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=report_.pdf`,
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const update_report_settings_handler = async (c: Context) => {
  const reportSettings = await c.req.json();
  const { user_id, ...settings } = reportSettings;
  if (!user_id || Object.keys(settings).length === 0) {
    return c.json({ message: "Invalid request" }, 400);
  }
  try {
    const result = await db`UPDATE conf_report SET ${db(
      reportSettings
    )} WHERE user_id = ${user_id}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "Report not found" }, 404);
    }
    return c.json({ message: "Report settings updated successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};
