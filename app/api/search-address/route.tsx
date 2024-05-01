import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  const sessionToken = uuidv4();


  const res = await fetch(
    `${BASE_URL}?q=${searchText}&language=en&session_token=${sessionToken}&limit=10&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
    { headers: { "Content-Type": "application/json" } }
  );
    const searchResults = await res.json()
  return NextResponse.json(searchResults);
}
