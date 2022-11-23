import { Driver } from "src/drivers/interfaces/drivers.interface";
import { Truck } from "src/garage/interfaces/truck.interface";

export interface Order {
    _id: number;
    desc: string;
    size: number;
    weight: number;
    amount: number;
    container: number;
    addressin: string;
    addressout: string;
    status: boolean;
    driver?: Driver;
    truck?: Truck;
}