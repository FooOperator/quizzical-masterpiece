declare type QuizParams = {
    [key: string]: QuizParam;
    category: QuizParam;
    difficulty: QuizParam;
    amount: QuizParam;
    type: QuizParam;
}

declare interface Question {
    id: number;
    question: string;
    category: string;
    difficulty: string;
    answers: string[];
    correctAnswerIndex: number;
}

declare type QuizParam = string | -1;