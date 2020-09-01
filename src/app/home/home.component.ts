import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'angfire';

  id = '';
  value = '';
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.items = db.list('event').valueChanges();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.db.list('event').push({id: this.id, name: this.value});
    this.id = '';
    this.value = '';
  }
}
