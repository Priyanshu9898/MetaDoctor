import { HeadingProp } from "@/constants";
import Image from "next/image";
import React, { FC } from "react";

const Heading: FC<HeadingProp> = ({ imageIcon, title, description }) => {
  return (
    <div className="text-black dark:text-white flex gap-x-4 md:items-center md:justify-start">
      <Image src={imageIcon} alt={title} width={56} height={56} />
      <div className="flex flex-col justify-between items-start gap-y-1">
        <h1 className="text-xl md:text-4xl">{title}</h1>
        <h6 className="text-sm md:text-md text-zinc-500">{description}</h6>
      </div>
    </div>
  );
};

export default Heading;
