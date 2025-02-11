import React from "react";
import { MoojuLogo } from "@/components/MoojuLogo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="-mb-28 flex justify-center pb-4 pt-0">
      <MoojuLogo className="z-10 h-48 cursor-pointer" />
    </header>
  );
}