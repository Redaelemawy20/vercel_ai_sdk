import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { aiConfig, isAIConfigured } from "@/lib/ai-config";

// Define the schema for a singer
const SingerSchema = z.object({
  id: z.number(),
  name: z.string(),
  arabicName: z.string(),
  country: z.string(),
  era: z.string(),
  genre: z.string(),
  famousSongs: z.array(z.string()),
  description: z.string(),
});

// Define the schema for the response
const ArabSingersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(SingerSchema),
  count: z.number(),
  message: z.string(),
});

export async function GET() {
  // Check if AI is configured
  if (!isAIConfigured()) {
    console.log("AI not configured, using fallback data");
    return NextResponse.json(getFallbackData());
  }
  // conigure the api key for openai
  try {
    const { object: result } = await generateObject({
      ...aiConfig,
      schema: ArabSingersResponseSchema,
      prompt: `Generate a list of 10 most famous Arab singers from the 20th century to present. 
      
      For each singer, provide:
      - id: unique number
      - name: English name
      - arabicName: Arabic name in Arabic script
      - country: country of origin
      - era: years they were active (e.g., "1898-1975", "1935-present")
      - genre: their musical genre/style
      - famousSongs: array of 5 most famous songs
      - description: a brief description including their famous titles/nicknames
      
      Include legendary singers.
      
      Make sure the response follows the exact schema structure with success: true, data array, count, and message.`,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating Arab singers:", error);
    return NextResponse.json(getFallbackData());
  }
}

// Fallback data function
function getFallbackData() {
  return {
    success: true,
    data: [
      {
        id: 1,
        name: "Umm Kulthum",
        arabicName: "أم كلثوم",
        country: "Egypt",
        era: "1898-1975",
        genre: "Classical Arabic Music",
        famousSongs: ["Enta Omri", "Alf Leila wa Leila", "Inta Omri"],
        description: "Known as 'The Star of the East' and 'The Voice of Egypt'",
      },
      {
        id: 2,
        name: "Fairuz",
        arabicName: "فيروز",
        country: "Lebanon",
        era: "1935-present",
        genre: "Lebanese Folk, Arabic Classical",
        famousSongs: ["Ya Tayr", "Nassam Alayna El Hawa", "Kifak Inta"],
        description:
          "Known as 'The Ambassador to the Stars' and 'The First Lady of Lebanese Song'",
      },
      {
        id: 3,
        name: "Abdel Halim Hafez",
        arabicName: "عبد الحليم حافظ",
        country: "Egypt",
        era: "1929-1977",
        genre: "Arabic Classical, Egyptian Folk",
        famousSongs: ["Ahwak", "Gana El Hawa", "Zay El Hawa"],
        description:
          "Known as 'The Dark Nightingale' and 'King of Arabic Music'",
      },
      {
        id: 4,
        name: "Warda Al-Jazairia",
        arabicName: "وردة الجزائرية",
        country: "Algeria",
        era: "1939-2012",
        genre: "Algerian Folk, Arabic Classical",
        famousSongs: [
          "Batwanes Beek",
          "Ya Habibi Ya Nour El Ain",
          "Albi W Ma'aya",
        ],
        description: "Known as 'The Algerian Rose' and 'The Voice of Algeria'",
      },
      {
        id: 5,
        name: "Mohammed Abdel Wahab",
        arabicName: "محمد عبد الوهاب",
        country: "Egypt",
        era: "1902-1991",
        genre: "Arabic Classical, Egyptian Folk",
        famousSongs: ["Ya Msafer Wahdak", "Al Gondol", "Ya Leil Ya Ein"],
        description:
          "Known as 'The Musician of the Generations' and 'The Prince of Arabic Music'",
      },
      {
        id: 6,
        name: "Asmahan",
        arabicName: "أسمهان",
        country: "Syria",
        era: "1912-1944",
        genre: "Arabic Classical, Syrian Folk",
        famousSongs: ["Ya Habibi Ta'ala", "Layali El Ouns", "Ya Toyour"],
        description:
          "Known as 'The Princess of the Arabs' and sister of Farid Al-Atrash",
      },
      {
        id: 7,
        name: "Farid Al-Atrash",
        arabicName: "فريد الأطرش",
        country: "Syria",
        era: "1910-1974",
        genre: "Arabic Classical, Syrian Folk",
        famousSongs: [
          "Ya Habibi Ya Nour El Ain",
          "Ya Gamil Ya Gamil",
          "Albi W Ma'aya",
        ],
        description:
          "Known as 'The King of the Oud' and 'The Prince of Arabic Music'",
      },
      {
        id: 8,
        name: "Sabah",
        arabicName: "صباح",
        country: "Lebanon",
        era: "1927-2014",
        genre: "Lebanese Folk, Arabic Classical",
        famousSongs: ["Ya Zaman", "Ya Habibi Ta'ala", "Ya Ain Moulaytein"],
        description:
          "Known as 'The Shining Star' and 'The Queen of Lebanese Song'",
      },
      {
        id: 9,
        name: "Kadim Al Sahir",
        arabicName: "كاظم الساهر",
        country: "Iraq",
        era: "1957-present",
        genre: "Arabic Pop, Iraqi Folk",
        famousSongs: ["Madrasat Al Hob", "Ana Wa Laila", "Qissat Haya"],
        description:
          "Known as 'The Caesar of Arabic Song' and 'The Iraqi Nightingale'",
      },
      {
        id: 10,
        name: "Majida El Roumi",
        arabicName: "ماجدة الرومي",
        country: "Lebanon",
        era: "1956-present",
        genre: "Lebanese Folk, Arabic Classical",
        famousSongs: ["Kalimat", "Beirut", "Ya Beirut"],
        description:
          "Known as 'The Voice of Lebanon' and 'The Ambassador of Lebanese Song'",
      },
    ],
    count: 10,
    message: "Famous Arab singers retrieved successfully (fallback data)",
  };
}
