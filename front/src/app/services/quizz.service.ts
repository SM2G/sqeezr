import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { IQuestion } from '../models/question.model';

import { map } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map as rxMap } from 'rxjs/operators';

@Injectable()
export class QuizzService {
	private _questionsCollection: AngularFirestoreCollection<IQuestion>;
	public questions: Observable<IQuestion[]>;

	constructor(private _afs: AngularFirestore) {
		this._questionsCollection = _afs.collection<IQuestion>('questions');
	}

	public initQuestions() {
		this.questions = this._questionsCollection.snapshotChanges().pipe(
			rxMap(questions =>
				map(questions, q => {
					const data = q.payload.doc.data() as IQuestion;
					const id = q.payload.doc.id;

					return { id, ...data };
				}),
			),
		);
	}
}
