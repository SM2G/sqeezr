import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { IQuestion, IAnsweredQuestion } from '../models/question.model';

import { map } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map as rxMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class QuizzService {
	public questions$: Observable<IQuestion[]>;
	public exposedAnswers$: Observable<IAnsweredQuestion[]>;

	private _questionsCollection: AngularFirestoreCollection<IQuestion>;
	public _answers$: BehaviorSubject<IAnsweredQuestion[]>;

	constructor(private _afs: AngularFirestore, private _router: Router) {
		this._questionsCollection = _afs.collection<IQuestion>('questions');
		this._answers$ = new BehaviorSubject(null);

		this.exposedAnswers$ = this._answers$.asObservable();
	}

	public initQuestions() {
		this.questions$ = this._questionsCollection.snapshotChanges().pipe(
			rxMap(questions =>
				map(questions, q => {
					const data = q.payload.doc.data() as IQuestion;
					const id = q.payload.doc.id;
					return { id, ...data };
				}),
			),
		);
	}

	public checkAnswer(answer: string, question: IQuestion): void {
		const id = question.id;
		const answers = this._answers$.value || [];

		answers[id] = {
			...question,
			isCorrect: answer === question.validAnswer,
			givenAnswer: answer,
		} as IAnsweredQuestion;
		this._answers$.next(answers);
	}

	public getAnswersStats(): void {
		this._router.navigate(['/quizz/stats']);
	}
}
