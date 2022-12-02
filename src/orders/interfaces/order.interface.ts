import { Driver } from "src/drivers/interfaces/drivers.interface";
import { Truck } from "src/garage/interfaces/truck.interface";

import { Document } from "mongoose";

export interface Order extends Document {
    _id: string;
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
    price: number;
    distance: string;
    accepted: boolean;
    finished: Boolean;
}