// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Bridge from "@/components/Bridge";
import GalleryButton from "@/components/Confetti";

// Fetch the list of images from the API
async function getImages(): Promise<string[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/images`, {
      cache: "force-cache",
    });
    const data = await response.json();
    return data.images; // Ensure the API returns an array of strings
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function Home() {
  // Fetch images on the server
  const images: string[] = await getImages();

  if (!images.length) {
    return <h1>No Images to Display</h1>;
  }

  return (
    <main className="mx-auto max-w-[1960px] p-4 dark">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center opacity-50">
              <Bridge />
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <div className="flex items-center justify-center pt-10 mt-10">
            <Image
              width={400}
              height={500}
              src="/logo.jpeg"
              alt="SEEES Challenge Quest"
              className="rounded-full w-[300px]"
            />
          </div>
          <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
            2024/2025 SEEES WEEK Highlights
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            The SEEES Week community came together for an unforgettable
            celebration filled with engaging workshops, inspiring talks, and
            memorable moments.
          </p>

          <GalleryButton />
        </div>
        {images.map((image: string, id: number) => (
          <Link
            key={id}
            href={`/photo/${id}`} // Use dynamic route instead of query parameter
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            prefetch={true}
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={720}
              height={480}
              src={`/SEEES Challenge Quest/${image}`}
              loading="lazy"
              quality={50}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
