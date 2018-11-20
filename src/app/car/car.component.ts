import { Car } from './../car.model';
import { Component, OnInit, Input} from '@angular/core';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;

  constructor(private service: CarsService) { }

  onBuy() {
    this.car.isSold = true;
    this.service.updateCar(this.car);
  }

  onDelete() {
    this.service.deleteCar(this.car);
  }
}
