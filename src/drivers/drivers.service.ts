import { Injectable, ForbiddenException } from '@nestjs/common';
import { Driver } from './interfaces/drivers.interface';

import { HttpService } from "@nestjs/axios";

import { map, catchError } from 'rxjs';

@Injectable()
export class DriversService {

    constructor(private http: HttpService) { }

    async getDistance() {
        return this.http
            .get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=AIzaSyAvDJR7162n3hAOb0TuQafdssfXy7VwtnA')
            .pipe(
                map((res) => res.data?.rows),
                map((rows) => rows?.[0].elements),
                map((elements) => elements?.[0].distance),
                map((distance) => {
                    return distance?.text;
                }),
            )
            .pipe(
                catchError(() => {
                    throw new ForbiddenException('API not available');
                }),
            );
    }

    private drivers: Driver[] = [
        {
            _id: 1,
            name: 'Joao Pedro Lima',
            status: true
        },
        {
            _id: 2,
            name: 'Marcos Henrique',
            status: true,
            orderid: 1
        }
    ];

    getDrivers() {
        return this.drivers;
    }

    getAvailibleDrivers() {
        return this.drivers.filter(e => e.status === false);
    }

}
