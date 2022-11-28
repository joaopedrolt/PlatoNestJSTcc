import { Injectable, ForbiddenException } from '@nestjs/common';
import { Driver } from './interfaces/drivers.interface';

import { HttpService } from "@nestjs/axios";

import { map, catchError } from 'rxjs';

@Injectable()
export class DriversService {

    constructor(private http: HttpService) { }

    private drivers: Driver[] = [
        {
            _id: 1,
            name: 'Giovanni Diniz',
            status: true,
            orderid: 2
        },
        {
            _id: 2,
            name: 'Marcos Henrique',
            status: true,
            orderid: 3
        },
        {
            _id: 3,
            name: 'Gabriel Uchoa',
            status: false
        }
    ];

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

    getDrivers() {
        return this.drivers;
    }

    getAvailibleDrivers() {
        return this.drivers.filter(e => e.status === false);
    }

    driverUpdate(driverParam: Driver) {

        const index = this.drivers.findIndex(driver => {
            return driver._id === driverParam._id;
        });

        this.drivers.splice(index, 1, driverParam);

    }

}
