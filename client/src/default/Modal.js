// Modal.js
import useStore from './useStore';
import { ModalBackdrop, ModalContainer } from './styled';

const Modal = () => {
  const isModalOpen = useStore((state) => state.isModalOpen);
  const modalConfig = useStore((state) => state.modalConfig);
  const closeModal = useStore((state) => state.closeModal);

  if (!isModalOpen) return null;

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {modalConfig.icon && <div>{modalConfig.icon}</div>}
        {modalConfig.title && <h1>{modalConfig.title}</h1>}
        {modalConfig.content && <p>{modalConfig.content}</p>}
        {modalConfig.buttons
          ? modalConfig.buttons.map((button, index) => (
              <span key={index}>{button}</span>
            ))
          : null}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default Modal;
