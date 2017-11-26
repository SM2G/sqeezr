import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { IQuestion } from '../models/question.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuizzService {
	private _questionsCollection: AngularFirestoreCollection<IQuestion>;
	public questions: Observable<IQuestion[]>;

	constructor(private _afs: AngularFirestore) {
		this._questionsCollection = _afs.collection<IQuestion>('questions');
	}

	public initQuestions() {
		this.questions = this._questionsCollection.valueChanges();
	}
}
