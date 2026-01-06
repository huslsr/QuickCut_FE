import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&format=json`;
    const res = await fetch(url);
    
    // Check if Open-Meteo succeeded
    if (res.ok) {
        const data = await res.json();
        // Open-Meteo returns { results: [...] } or { results: [] }
        if (data.results && data.results.length > 0) {
             return NextResponse.json(data);
        }
    }
    
    // FALLBACK: Nominatim (OpenStreetMap)
    // If Open-Meteo failed (404/500) or returned empty results, try Nominatim
    console.log("Open-Meteo failed/empty, failing back to Nominatim...");
    
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`;
    const nomRes = await fetch(nomUrl, {
        headers: {
            "User-Agent": "QuickCut/1.0 (QuickCut News App)" // Required by Nominatim
        }
    });

    if (nomRes.ok) {
        const nomData = await nomRes.json();
        // Convert Nominatim format to Open-Meteo-like structure for frontend compatibility
        // Nominatim: { address: { city: "Noida", state: "Uttar Pradesh", country: "India" }, display_name: "..." }
        // Open-Meteo expected: { results: [{ name: "Noida", city: "Noida", admin1: "Uttar Pradesh", country: "India" }] }
        
        if (nomData.address) {
             const result = {
                 results: [{
                     name: nomData.address.city || nomData.address.town || nomData.address.village || nomData.name,
                     city: nomData.address.city,
                     town: nomData.address.town,
                     village: nomData.address.village,
                     admin1: nomData.address.state,
                     country: nomData.address.country
                 }]
             };
             return NextResponse.json(result);
        }
    }
    
    // If both fail, return empty
    return NextResponse.json({ results: [] });

  } catch (error: any) {
    console.error("Geocoding fetch error:", error);
    // Don't crash, just return empty
    return NextResponse.json({ results: [] }); 
  }
}
