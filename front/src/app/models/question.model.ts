export interface IQuestion {
	id?: string;
	question: string;
	answers: string[];
	validAnswer: string;
}

export interface IAnsweredQuestion extends IQuestion {
	isCorrect: boolean;
	givenAnswer: string;
}
