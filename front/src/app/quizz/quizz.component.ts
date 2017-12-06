import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { QuizzService } from '../services/quizz.service';
import { IQuestion, IAnsweredQuestion } from '../models/question.model';

import { toPairs } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'sq-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
	public questions$: Observable<IQuestion[]>;
	public hasAnsweredAllQuestions$: BehaviorSubject<boolean>;

	private _questionCount: number;

	constructor(
		private _afs: AngularFirestore,
		private _quizzService: QuizzService,
	) {
		_quizzService.initQuestions();
		this.questions$ = _quizzService.questions$;
		this.hasAnsweredAllQuestions$ = new BehaviorSubject(false);
	}

	ngOnInit() {
		this.questions$.subscribe(questions => {
			if (!questions) return;
			this._questionCount = questions.length;
		});
	}

	public checkAnswer(event: MatRadioChange, question: IQuestion): void {
		if (!event || !question) return;
		this._quizzService.checkAnswer(event.value, question);
		this._endQuizzCheck();
	}

	public endQuizz(): void {
		localStorage.setItem('finished', 'true');
		this._quizzService.getAnswersStats();
	}

	private _endQuizzCheck(): void {
		const answers = toPairs(
			this._quizzService._answers$.value,
		) as IAnsweredQuestion[];

		if (answers.length === this._questionCount) {
			this.hasAnsweredAllQuestions$.next(true);
		}
	}
}
