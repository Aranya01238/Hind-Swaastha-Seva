import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import bcrypt from "bcrypt";
import { TAB_NAMES } from "@/lib/sheets-config";

// Helper function to get Google Sheet client (assuming you have one, or adapt this)
async function getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  // Use the specific Sheets v4 client constructor directly
  return new google.sheets_v4.Sheets({ auth: authClient });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 },
      );
    }

    const sheets = await getGoogleSheetClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const usersTabName = TAB_NAMES.Users;

    if (!spreadsheetId || !usersTabName) {
      throw new Error("Google Sheet ID or Users tab name is not configured.");
    }

    // Read existing users to check for duplicate email
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${usersTabName}!A:B`, // Assuming email is in column B
    });

    const existingUsers = response.data.values || [];
    const headerRow = existingUsers[0];
    const emailColumnIndex = headerRow ? headerRow.indexOf("email") : -1;

    if (emailColumnIndex === -1) {
      // If 'email' column not found, assume it's the second column (index 1)
      console.warn("Email column not found by header, assuming index 1.");
    }

    const isEmailTaken = existingUsers.some((row: (string | null | undefined)[], index: number) => {
      if (index === 0) return false; // Skip header row
      const userEmail = emailColumnIndex !== -1 ? row[emailColumnIndex] : row[1]; // Fallback to index 1
      return userEmail && userEmail.toLowerCase() === email.toLowerCase();
    });

    if (isEmailTaken) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Append new user data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${usersTabName}!A1`, // Start appending from A1, Google Sheets will find the next empty row
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[name, email, hashedPassword]], // Assuming columns are Name, Email, HashedPassword
      },
    });

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { message: "Failed to register user.", error: error.message },
      { status: 500 },
    );
  }
}