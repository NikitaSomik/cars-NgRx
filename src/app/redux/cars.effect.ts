import { CarsService } from './../cars.service';
import { Car } from './../car.model';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CAR_ACTION, AddCar } from './cars.action';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CarsEffect {

    constructor(private actions$: Actions, private service: CarsService) {}

    @Effect() loadCars = this.actions$.ofType(CAR_ACTION.ADD_CAR)
        .pipe(
            switchMap((action: AddCar) => {
                return this.service.preloadCars();
            }),
            mergeMap((cars) => {
                return [
                    {
                        type: CAR_ACTION.LOAD_CARS,
                        payload: cars
                    }
                ];
            })
        );
}
