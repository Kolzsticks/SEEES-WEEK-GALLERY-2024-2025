"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden max-w-screen h-[100svh] bg-black/10" >
        <DialogTitle className="hidden">Image Modal</DialogTitle>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
