import { create } from 'zustand';

const useStore = create((set) => ({
  isLogin: false,
  setLoginStatus: (isLogin) => set({ isLogin }),

  showModal: false,
  setShowModal: (showModal) => set({ showModal }),

  // * 재사용 모달
  isModalOpen: false,
  modalConfig: {
    icon: null,
    title: '',
    content: '',
    buttons: [],
  },
  openModal: (config) =>
    set((state) => ({
      isModalOpen: true,
      modalConfig: { ...state.modalConfig, ...config },
    })),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useStore;
