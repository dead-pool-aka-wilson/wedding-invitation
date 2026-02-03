/**
 * Google Apps Script for Wedding RSVP
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire code
 * 4. Click Deploy > New deployment
 * 5. Select "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the URL
 * 9. Add the URL to your .env as NEXT_PUBLIC_GOOGLE_SHEETS_URL
 */

const SHEET_NAME = "RSVPs";

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = JSON.parse(e.postData.contents);
    
    const row = [
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.attendance,
      data.guestCount,
      data.dietaryRestrictions || "",
      data.message || "",
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "RSVP recorded" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: "RSVP endpoint active" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Phone",
      "Attendance",
      "Guest Count",
      "Dietary Restrictions",
      "Message",
    ]);
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}
