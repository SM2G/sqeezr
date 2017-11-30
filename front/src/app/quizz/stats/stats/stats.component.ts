import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';
import { IAnsweredQuestion } from '../../../models/question.model';

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

	constructor(private _quizzService: QuizzService) {
		this.hasCompletedQuizz = new BehaviorSubject(false);
		this.filteredAnswers$ = new BehaviorSubject([] as IAnsweredQuestion[]);
		this.answers$ = _quizzService.exposedAnswers$;
		this.correctAnswers = 0;
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
			this.hasCompletedQuizz.next(true);
		});
	}
}
