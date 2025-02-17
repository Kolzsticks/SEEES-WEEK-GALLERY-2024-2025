"use client"; // This must be a Client Component to use `useRouter` and `React.use`

import { Modal } from "@/components/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react"; // Import `use` from React
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { ChevronLeft, ChevronRight } from "lucide-react";

type Params = {
  photoId: string; // Match the dynamic route parameter name
};

export default function Page({ params }: { params: Promise<Params> }) {
  const router = useRouter();
  const [isImageLoading, setImageLoading] = React.useState(true)

  // Unwrap the params Promise using `React.use()`
  const { photoId } = use(params);
  const photoIdNumber = Number(photoId); // Convert `photoId` to a number if needed

  // Fetch the list of images (client-side fetching)
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchImages() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/images`, {
          cache: "force-cache",
        });
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }

    fetchImages();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoIdNumber, images.length]);

  // Handle navigation to the previous image
  const handlePrevious = () => {
    if (photoIdNumber > 0) {
      router.replace(`/photo/${photoIdNumber - 1}`); // Use `replace` instead of `push`
    }
  };

  // Handle navigation to the next image
  const handleNext = () => {
    if (photoIdNumber < images.length - 1) {
      router.replace(`/photo/${photoIdNumber + 1}`); // Use `replace` instead of `push`
    }
  };

  // Show skeleton loader while loading
  // if (isLoading || !images.length) {
  //   return (
  //     <Modal>
  //       <div className="flex justify-center items-center h-full">
  //         <Skeleton className="w-full h-[400px] rounded-lg lg:px-0 px-4" />{" "}
  //         {/* Skeleton loader */}
  //       </div>
  //     </Modal>
  //   );
  // }

  // Find the specific photo by photoId
  const photo = images[photoIdNumber];

  if (!photo) {
    return (
      <Modal>
        <h1 className="text-center">No Photo Found for that ID.</h1>
      </Modal>
    );
  }

  return (
    <Modal key={photoIdNumber}>
      {" "}
      {/* Force re-render when photoId changes */}
      <div className="flex justify-center items-center h-full relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={photoIdNumber === 0}
          className="absolute left-4 p-2  border-white border-2 text-white rounded-full hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft />
        </button>
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-lg" /> // Skeleton loader for the image
        ) : (
          <Image
            src={`/SEEES Challenge Quest/${photo}`} // Ensure the path is correct
            alt={`Photo ${photoIdNumber}`}
            width={600} // Set appropriate width
            height={400} // Set appropriate height
            className={`${isImageLoading ? 'blur' : 'remove-blur'} object-cover rounded-lg`}
            priority={true}
            quality={70}
            onLoad={() => setImageLoading(false)}
          />
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={photoIdNumber === images.length - 1}
          className="absolute right-4 p-2  border-white border-2 text-white rounded-full hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
          {photoIdNumber + 1} / {images.length}
        </div>
      </div>
    </Modal>
  );
}
