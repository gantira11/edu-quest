import { Quetion } from "@/features/quiz/utils/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  quetions_id?: string,
  option_id?: string
}

interface AnswerStore {
  answer: Answer[],
  setAnswer: (value: Quetion[]) => void;
  assignOption: (index: number, option_id?: string) => void,
  resetState: () => void
}

export const useAnswerStore = create<AnswerStore>()(
  persist((set) => ({
    answer: [],
    setAnswer: (data) => {
      const answer = data.map((question) => ({
        question_id: question.id,
        option_id: undefined,
      }));
      set({ answer });
    },
    assignOption: (index, selectedOption) => {
      set(state => {
        state.answer[index].option_id = selectedOption;
        return {}
      })
    },
    resetState: () => {
      set({ answer: [] })
    },
  }), { name: 'question-store' })
)