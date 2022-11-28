import { Driver } from "src/drivers/interfaces/drivers.interface";
import { Truck } from "src/garage/interfaces/truck.interface";

export type OrderDto = {
    weight: number;
    cepIn: string;
    cepOut: string;
}

export type OrderUpdateDto = {
    driver: Driver;
    truck: Truck;
}