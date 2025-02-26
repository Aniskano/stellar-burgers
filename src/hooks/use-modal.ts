import { useCallback, useState } from 'react';
import { useHotKey } from './use-hot-key';

export type UseModalType = (x?: {
  openHandler?: () => void;
  closeHandler?: () => void;
}) => {
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  isModalOpen: boolean;
};

export const useModal: UseModalType = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    if (props?.openHandler instanceof Function) props.openHandler();

    setIsModalOpen(true);
  }, [props]);

  const closeModal = useCallback(() => {
    if (props?.closeHandler instanceof Function) props.closeHandler();

    setIsModalOpen(false);
  }, [props]);

  const toggleModal = useCallback(() => {
    if (!isModalOpen) openModal();
    if (isModalOpen) closeModal();
  }, [closeModal, isModalOpen, openModal]);

  useHotKey({ key: 'Escape', canUse: isModalOpen, handler: closeModal });

  return { openModal, closeModal, toggleModal, isModalOpen };
};
