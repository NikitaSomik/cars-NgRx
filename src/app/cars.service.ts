import { catchError } from 'rxjs/operatorstoPromise';
import { AddCar, LoadCars, DeleteCar, UpdateCar } from './redux/cars.action';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from './redux/app.state';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './car.model';

@Injectable()
export class CarsService {

    static BASE_URL: string = 'http://localhost:3000/';

    constructor(private http: HttpClient, private stote: Store<AppState>) {}

    loadCars() {
        this.http.get(CarsService.BASE_URL + 'cars')
            .toPromise()
            .then((data: HttpResponse<any>) =>
                this.stote.dispatch(new LoadCars(data))
            );
            // .pipe(map((response: Response) => response.json()))
            // .toPromise()
            // .then((cars: Response) => {
            //     console.log(cars);
            //     this.stote.dispatch(new LoadCars(cars));
            // });
    }

    addCar(car: Car) {
        this.http.post(CarsService.BASE_URL + 'cars', car)
            .toPromise()
            .then((data: HttpResponse<any>) =>
                this.stote.dispatch(new AddCar(data))
            );
    }

    deleteCar(car: Car) {
        this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
            .toPromise()
            .then(() =>
                this.stote.dispatch(new DeleteCar(car))
            );
    }

    updateCar(car: Car) {
        this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car)
            .toPromise()
            .then((data: HttpResponse<any>) =>
                this.stote.dispatch(new UpdateCar(car))
            );
    }
}
