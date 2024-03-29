import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const json = await res.json();
  return NextResponse.json(json);
}
