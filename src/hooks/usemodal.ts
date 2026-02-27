import { useState } from "react";

/* =====================================
   Modal Type Interface
===================================== */

export interface ModalTypeInterface {
  isMpinVerify?: boolean;
  isConfirmModal?: boolean;
  isImagePreview?: boolean;
  isSuccessModal?: boolean;
}

/* =====================================
   Hook Return Type
===================================== */

interface UseModalReturn<T = unknown> {
  isModalOpen: ModalTypeInterface;
  isImageModelOpen: boolean;
  data: T | null;
  openModal: (type: ModalTypeInterface, data?: T) => void;
  closeModal: (type?: ModalTypeInterface) => void;
}

/* =====================================
   Hook
===================================== */

const useModal = <T = unknown>(): UseModalReturn<T> => {
  const [isModalOpen, setIsOpen] = useState<ModalTypeInterface>({});
  const [isImageModelOpen, setIsImageModelOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (type: ModalTypeInterface, modalData?: T) => {
    setIsOpen(type);
    if (modalData !== undefined) {
      setData(modalData);
    }
  };

  const closeModal = (type: ModalTypeInterface = {}) => {
    setIsOpen(type);
    setIsImageModelOpen(false);
    setData(null);
  };

  return {
    isModalOpen,
    isImageModelOpen,
    data,
    openModal,
    closeModal,
  };
};

export default useModal;