export type QuizParams = {
    [key: string]: QuizParam;
    category: QuizParam;
    difficulty: QuizParam;
    amount: QuizParam;
    type: QuizParam;
}

export interface Question {
    id: number;
    question: string;
    category: string;
    difficulty: string;
    answers: string[];
    correctAnswerIndex: number;
}

export type QuizParam = string | -1;