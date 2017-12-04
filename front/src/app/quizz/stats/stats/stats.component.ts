import { Component, OnInit } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { QuizzService } from '../../../services/quizz.service';

import { IAnsweredQuestion } from '../../../models/question.model';
import { IUser } from '../../../models/user.model';

import { toPairs, forEach } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'sq-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
	public answers$: Observable<IAnsweredQuestion[]>;
	public hasCompletedQuizz: BehaviorSubject<boolean>;
	public filteredAnswers$: BehaviorSubject<IAnsweredQuestion[]>;

	public count: number;
	public correctAnswers: number;

	private _usersCollection: AngularFirestoreCollection<IUser>;
	private _users: Observable<IUser[]>;

	constructor(
		private _quizzService: QuizzService,
		private _afs: AngularFirestore,
	) {
		this.hasCompletedQuizz = new BehaviorSubject(false);
		this.filteredAnswers$ = new BehaviorSubject([] as IAnsweredQuestion[]);
		this.answers$ = _quizzService.exposedAnswers$;
		this.correctAnswers = 0;

		this._usersCollection = this._afs.collection<IUser>('users');
		this._users = this._usersCollection.valueChanges();
	}

	ngOnInit() {
		this.answers$.subscribe(givenAnswers => {
			const answers = toPairs(givenAnswers) as IAnsweredQuestion[];
			const filtered = this.filteredAnswers$.value;

			if (!answers || answers.length <= 0) {
				this.count = 0;
				this.correctAnswers = 0;
				this.hasCompletedQuizz.next(false);
				return;
			}
			this.count = answers.length;
			forEach(answers, (answerArray: [string, IAnsweredQuestion]) => {
				const id = answerArray[0];
				const answer = answerArray[1];

				if (id === answer.id) {
					if (answer.isCorrect) {
						this.correctAnswers++;
					}
					filtered.push(answer);
				}
			});
			this.filteredAnswers$.next(filtered);
			this._saveUserData();
			this.hasCompletedQuizz.next(true);
		});
	}

	private _saveUserData(): void {
		const score = this.correctAnswers;
		const user = {
			name: localStorage.getItem('name'),
			mail: localStorage.getItem('mail'),
			score: score,
		} as IUser;

		this._usersCollection.add(user);
	}
}
