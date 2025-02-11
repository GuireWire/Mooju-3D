"use client";

import { Environment, Scroll } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {};

export default function Scene({}: Props) {
  const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

//   const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  const radialConfigs = [
    {
      radialBg: "rgba(123, 232, 156, 0.8)",
      conicColor1: "#82f5a5",
      conicColor2: "#7BE89C",
    },
    {
      radialBg: "rgba(212, 212, 212, 0.8)",
      conicColor1: "#AFAFAF",
      conicColor2: "#D4D4D4",
    },
    {
      radialBg: "rgba(168, 230, 162, 0.8)",
      conicColor1: "#86C98D",
      conicColor2: "#A8E6A2",
    },
  ];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 !== 0;

        const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
        const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: yRotation,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {  // Change from :root to .alternating-text-container
            '--radial-bg': gsap.utils.wrap(radialConfigs, index).radialBg,
            '--conic-color1': gsap.utils.wrap(radialConfigs, index).conicColor1,
            '--conic-color2': gsap.utils.wrap(radialConfigs, index).conicColor2,
            ease: "power2.inOut",
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      ref={canRef}
      position-x={isDesktop ? 1 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
    >
      <FloatingCan flavor="mint" />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}