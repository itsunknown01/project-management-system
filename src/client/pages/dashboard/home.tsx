import React, { useEffect } from "react";
import { useModalStore } from "@/hooks/modal/use-modal-store";

const Home = () => {
  const { isOpen, onOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default Home;
