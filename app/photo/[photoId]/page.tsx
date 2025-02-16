// app/photo/[photoId]/page.tsx
import Image from "next/image";

type Params = Promise<{
  photoId: string; // Match the dynamic route parameter name
}>;


export default async function Page({ params }: { params: Params }) {
  // Await the params promise to get the resolved params object
  const resolvedParams = await params;
  const photoId = Number(resolvedParams.photoId); // Convert 
  // Fetch the list of images from the API
  const response = await fetch("http://localhost:3000/api/images");
  const photoData = await response.json();

  // Find the specific photo by photoId
  const photo = photoData.images[photoId];
  // console.log(photoData);

  if (!photo) {
    return <h1 className="text-center">No Photo Found for that ID.</h1>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src={`/SEEES Challenge Quest/${photo}`}
        alt={`Photo ${photoId}`}
        width={800}
        height={600}
        className="object-cover rounded-lg"
      />
    </div>
  );
}
