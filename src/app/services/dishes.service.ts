import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  dishes: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { }

  // tslint:disable-next-line:typedef
  onCreateDish(dishInfor){
    this.db.list('dishes').push({id: dishInfor.id, name: dishInfor.name, price: dishInfor.price, unit: dishInfor.unit});
  }

  // tslint:disable-next-line:typedef
  onGetDishes(){
    return this.db.list('dishes').valueChanges();
  }
}
