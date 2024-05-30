import { useModalStore } from "@/hooks/modal/use-modal-store";
import React from "react";
import Modal from "../ui/modal";
import ProjectForm from "../forms/project-form";

const ProjectModal = () => {
  const { isOpen, onClose } = useModalStore();
  return (
    <Modal
      title="Create Project"
      description="Add a new project to manage its contents"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProjectForm onClose={onClose} />
    </Modal>
  );
};

export default ProjectModal;
