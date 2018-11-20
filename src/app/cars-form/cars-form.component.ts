import { CarsService } from './../cars.service';
import { Car } from './../car.model';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent {
  private id = 2;

  carName = '';
  carModel = '';



  constructor(private service: CarsService) {}


  onAdd() {
    // tslint:disable-next-line:curly
    if (this.carName === '' || this.carModel === '') return;

    const date = moment().format('D MMM YYYY HH:mm:ss');
    const car = new Car(
      this.carName,
      date,
      this.carModel
    );

    //this.store.dispatch(new AddCar(car));
    this.service.addCar(car);

    this.carName = '';
    this.carModel = '';
  }

  onLoad() {
    this.service.loadCars();
  }
}
