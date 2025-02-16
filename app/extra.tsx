import Image from "next/image";
import Link from "next/link";

// Custom array of Unsplash image URLs
const images = [
  {
    id: 1,
    url: `https://drive.google.com/u/0/drive-usercontent/1IF9Rm68OqZjC9NFLKoWK2vgjcXSwsQVd=w200-h190-p-k-rw-v1-nu-iv1`,
    alt: "Nature Image 1",
  },
  {
    id: 2,
    url: `https://drive.google.com/u/0/drive-usercontent/1tOsM-uIv_96eGk7p4k-GXAC7pPv1t3YM=w200-h190-p-k-rw-v1-nu-iv1`,
    alt: "Nature Image 2",
  },
  {
    id: 3,
    url: `https://drive.google.com/u/0/drive-usercontent/1qwrbgnXqnVKi73LdYoXrGgeP5B-aUBLx=w200-h190-p-k-rw-v1-nu-iv1`,
    alt: "Nature Image 3",
  },
  {
    id: 4,
    url: `https://drive.google.com/u/0/drive-usercontent/1DH0ZCur5IXSnQipGqmhaFGugXblf9EqZ=w200-h190-p-k-rw-v1-nu-iv1`,
    alt: "Nature Image 4",
  },
  {
    id: 5,
    url: `https://drive.google.com/u/0/drive-usercontent/12o7H-aBeGcbjEZ2qX_f8unh4LGAuNA2A=w200-h190-p-k-rw-v1-nu-iv1`,
    alt: "Nature Image 5",
  },
];

export default function Home() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="flex max-h-full max-w-full items-center justify-center">
            {/* <Bridge /> */}
          </span>
          <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
        </div>
        {/* <Logo /> */}
        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
          2022 Event Photos
        </h1>
        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
          Our incredible Next.js community got together in San Francisco for our
          first ever in-person conference!
        </p>
        <a
          className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
          href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
          target="_blank"
          rel="noreferrer"
        >
          Clone and Deploy
        </a>
      </div>

      {/* Mapping through the images array */}
      {images.map(({ id, url, alt }) => (
        <Link
          key={id}
          href={`/?photoId=${id}`}
          as={`/p/${id}`}
          shallow
          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
          <Image
            alt={alt}
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={url}
            width={720}
            height={480}
            sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
          />
        </Link>
      ))}
    </div>
  );
}
