import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Question {
  id: string;
  // Define other properties of Question
}

interface Answer {
  question_id?: string;
  option_id?: string;
}

interface QuestionStore {
  selectedIndex: number;
  selectedOption: string | undefined;
  answer: Answer[];
  setSelectedIndex: (value: number | undefined) => void,
  setSelectedOption: (value: string) => void
  setData: (data: Question[]) => void;
  handlePrevQuestion: (index: number, selectedOption?: string) => void;
  handleNextQuestion: (index: number, selectedOption?: string) => void;
  handleSubmit: () => void;
  resetState: () => void
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      selectedIndex: 0,
      selectedOption: undefined,
      answer: [],
      setSelectedIndex: (value: number | undefined) => set({ selectedIndex: value }),
      setSelectedOption: (value) => set({ selectedOption: value }),
      setData: (data) => {
        const answer = data.map((question) => ({
          question_id: question.id,
          option_id: undefined,
        }));
        set({ answer });
      },
      handlePrevQuestion: (index, selectedOption) => {
        set((state) => {
          state.answer[index].option_id = selectedOption;
          return { selectedIndex: state.selectedIndex - 1, selectedOption: state.answer[state.selectedIndex - 1]?.option_id ?? undefined };
        });
      },
      handleNextQuestion: (index, selectedOption) => {
        set((state) => {
          state.answer[index].option_id = selectedOption;
          return { selectedIndex: state.selectedIndex + 1, selectedOption: state.answer[state.selectedIndex + 1]?.option_id ?? undefined };
        });
      },
      handleSubmit: () => {
        set((state) => {
          state.answer[state.selectedIndex].option_id = state.selectedOption;
          return { answer: state.answer };
        });
      },
      resetState: () => {
        set({
          selectedIndex: 0,
          selectedOption: undefined,
          answer: []
        })
      }
    }),
    { name: 'question-store' } // Provide a name for the persisted store
  )
);