import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {
	AngularFirestoreCollection,
	AngularFirestore,
} from 'angularfire2/firestore';

import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';

import { sortBy, reverse, forEach, random } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

interface IUserWithRank extends IUser {
	rank: number;
}

@Component({
	selector: 'sq-scores',
	templateUrl: './scores.component.html',
	styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
	public displayedColumns = ['rank', 'name', 'score'];
	public dataSource: UsersDataSource | null;

	constructor(
		private _userService: UserService,
		private _afs: AngularFirestore,
	) {
		this.dataSource = new UsersDataSource(_userService, _afs);
	}
}

export class UsersDataSource extends DataSource<IUserWithRank> {
	public hasLoaded$: BehaviorSubject<boolean>;

	private _usersCollection: AngularFirestoreCollection<IUser>;
	private _users$: Observable<IUser[]>;
	private _sortedUsers$: BehaviorSubject<IUserWithRank[]>;

	constructor(
		private _userService: UserService,
		private _afs: AngularFirestore,
	) {
		super();
		this.hasLoaded$ = new BehaviorSubject(false);
		this._sortedUsers$ = new BehaviorSubject(null);

		this._usersCollection = this._afs.collection<IUser>('users');
		this._users$ = this._usersCollection.valueChanges();

		this._users$.subscribe(users => {
			if (users) {
				let rank = 1;
				const sortedData = reverse(sortBy(users, ['score']));
				forEach(sortedData, user => (user.rank = rank++));
				this._sortedUsers$.next(sortedData);
				this.hasLoaded$.next(true);
			}
		});
	}

	connect(): Observable<IUserWithRank[]> {
		return this._sortedUsers$.asObservable();
	}

	disconnect() {}
}
