import React, { useEffect, useState } from "react";
import ProjectModal from "../modals/project-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <ProjectModal />
    </>
  );
};

export default ModalProvider;
