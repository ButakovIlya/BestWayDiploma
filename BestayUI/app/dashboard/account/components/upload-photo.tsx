"use client";

import { Input } from "@/app/components/ui/input";

export const UploadPhoto = () => {
  return (
    <Input
      type="file"
      onChange={(event) => {
        console.log(event);
      }}
    />
  );
};
