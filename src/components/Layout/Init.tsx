"use client";
import { useAccountEventListener } from "@/hooks/useAccountEventListener";

type Props = {};

const Init = (props: Props) => {
  useAccountEventListener();
  return null;
};

export default Init;
