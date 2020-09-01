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

  itemValue = '';
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.items = db.list('events').valueChanges();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.db.list('events').push({content: this.itemValue});
    this.itemValue = '';
  }
}
