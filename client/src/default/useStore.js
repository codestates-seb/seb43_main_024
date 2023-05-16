import create from 'zustand';

const useStore = create((set) => ({
  isLogin: false,
  setLoginStatus: (isLogin) => set({ isLogin }),
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
