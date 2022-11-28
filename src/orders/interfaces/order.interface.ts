import { Driver } from "src/drivers/interfaces/drivers.interface";
import { Truck } from "src/garage/interfaces/truck.interface";

export interface Order {
    _id: number;
    desc: string;
    weight: number;
    addressin: string;
    cepin: string;
    addressout: string;
    cepout: string;
    status: boolean;
    statusdesc: string;
    driver?: Driver;
    truck?: Truck;
    price?: number;
    distance?: string;
}