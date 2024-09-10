import { create } from 'zustand';

interface ModalWearableState {
    modalOpen: boolean;
    setModalOpen: (input: boolean) => void;
}

const useModalWearable = create<ModalWearableState>(set => ({
    modalOpen: false,
    setModalOpen: (input) => set({ modalOpen: input }),
}));

export default useModalWearable;