"use client";

import { clsx } from "clsx";
import dayjs from "dayjs";
import { SunMoon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useGlobalStore } from "@/store/globalStore";

export default function HomePage() {
  // Using Zustand global store for state management example
  const { gs, set } = useGlobalStore();

  useEffect(() => {
    toast.success(`Render on: ${dayjs().format("YYYY.MM.DD HH:mm:ss")}`);
  }); // no dependency array to demonstrate re-render toast

  function handleThemeToggle() {
    set("lightTheme", !gs.lightTheme);
    document.documentElement.classList.toggle("dark", gs.lightTheme);
  }

  return (
    <></>
  );
}
