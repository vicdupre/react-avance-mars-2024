import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch("https://fakestoreapi.com/products");
  const json = await res.json();
  return NextResponse.json(json);
}
