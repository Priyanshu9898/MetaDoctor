import ImageInput from "@/components/ImageInput";
import React, { FC } from "react";

const page: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[60%] pt-2">
        <ImageInput />
      </div>
    </div>
  );
};

export default page;
