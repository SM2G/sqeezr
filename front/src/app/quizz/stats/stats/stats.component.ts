import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';
import { IAnsweredQuestion } from '../../../models/question.model';

import { toPairs } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'sq-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
	public answers$: Observable<IAnsweredQuestion>;
	public hasCompletedQuizz: BehaviorSubject<boolean>;

	public count: number;
	public correctAnswers: number;

	constructor(private _quizzService: QuizzService) {
		this.hasCompletedQuizz = new BehaviorSubject(false);
		this.answers$ = _quizzService.exposedAnswers$;

		this.answers$.subscribe(givenAnswers => {
			const answers = toPairs(givenAnswers) as IAnsweredQuestion[];

			if (!answers || answers.length <= 0) {
				this.count = 0;
				this.correctAnswers = 0;
				this.hasCompletedQuizz.next(false);
				return;
			}
			this.count = answers.length;
			this.hasCompletedQuizz.next(true);
		});
	}

	ngOnInit() {}
}
