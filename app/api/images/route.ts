// app/api/images/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Define the path to the public images directory
  const imagesDirectory = path.join(process.cwd(), 'public', 'SEEES Challenge Quest');

  try {
    // Read the contents of the directory
    const imageFiles = fs.readdirSync(imagesDirectory);

    // Filter out non-image files if necessary (e.g., only .jpg, .png, etc.)
    const imageFileNames = imageFiles.filter((file) => {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
    });

    // Return the list of image file names as a JSON response
    return NextResponse.json({ images: imageFileNames });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Unable to read images directory' }, { status: 500 });
  }
}