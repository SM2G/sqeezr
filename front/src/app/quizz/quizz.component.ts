import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { QuizzService } from '../services/quizz.service';
import { IQuestion } from '../models/question.model';

import { Observable } from 'rxjs/Observable';
import { MatRadioChange } from '@angular/material';

@Component({
	selector: 'sq-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
	public questions$: Observable<IQuestion[]>;

	constructor(
		private _afs: AngularFirestore,
		private _quizzService: QuizzService,
	) {
		_quizzService.initQuestions();
		this.questions$ = _quizzService.questions$;
	}

	ngOnInit() {}

	public checkAnswer(event: MatRadioChange, question: IQuestion): void {
		if (!event || !question) return;
		this._quizzService.checkAnswer(event.value, question);
	}

	public endQuizz = (): void => this._quizzService.getAnswersStats();
}
