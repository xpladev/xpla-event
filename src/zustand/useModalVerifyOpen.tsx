import { create } from 'zustand';

interface ModalVerifyState {
    modalOpen: boolean;
    setModalOpen: (input: boolean) => void;
}

const useModalVerify = create<ModalVerifyState>(set => ({
    modalOpen: false,
    setModalOpen: (input) => set({ modalOpen: input }),
}));

export default useModalVerify;