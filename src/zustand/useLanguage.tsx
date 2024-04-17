import { create } from 'zustand';

interface LanguageState {
    language: string;
    setLanguage: (input: string) => void;
}

const useLanguage = create<LanguageState>(set => ({
    language: "english",
    setLanguage: (input) => set({ language: input }),
}));

export default useLanguage;