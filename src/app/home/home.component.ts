import {Component, OnInit} from '@angular/core';
import {DishesService} from '../services/dishes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dishId = '';
  dishName = '';
  dishPrice = '';
  dishUnit = '';
  dishes: Observable<any[]>;
  dishInfor: { id: string, name: string, price: string, unit: string};

  constructor(public dishesService: DishesService) {
  }

  ngOnInit(): void {
    this.dishes = this.dishesService.onGetDishes();
  }

  // tslint:disable-next-line:typedef
  removeAccents(str) {
    const AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ', 'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ'
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < AccentsMap.length; i++) {
      const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      const char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  // tslint:disable-next-line:typedef
  creatDishID() {
    const currentDate = new Date();
    const date = String(currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate());
    const month = String(currentDate.getMonth() < 10 ? '0' + currentDate.getMonth() : currentDate.getMonth());
    const year = String(currentDate.getFullYear()).substr(-2);
    const hour = String(currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours());
    const minute = String(currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes());
    const sec = String(currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds());
    this.dishId = sec + month + date + hour + year + minute;
    return this.dishId;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.dishName === '' && this.dishPrice === ''){
      return;
    }
    else {
      this.dishInfor = {id: this.creatDishID(), name: this.dishName, price: this.dishPrice, unit: this.dishUnit};
      this.dishesService.onCreateDish(this.dishInfor);
    }
    this.dishId = '';
    this.dishName = '';
    this.dishPrice = '';
    this.dishUnit = '';
  }
}
