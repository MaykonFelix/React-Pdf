import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const res = await axios.get(
    "https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf",
    { responseType: "arraybuffer" }
  );

  return new NextResponse(res.data, {
    headers: { "Content-Type": "application/pdf" },
  });
}
