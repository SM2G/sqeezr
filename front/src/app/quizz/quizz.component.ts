import { Component, OnInit } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { QuizzService } from '../services/quizz.service';
import { IQuestion } from '../models/question.model';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'sq-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
	public questions: Observable<IQuestion[]>;

	constructor(
		private _afs: AngularFirestore,
		private _quizzService: QuizzService,
	) {
		_quizzService.initQuestions();
		this.questions = _quizzService.questions;
	}

	ngOnInit() {}
}
