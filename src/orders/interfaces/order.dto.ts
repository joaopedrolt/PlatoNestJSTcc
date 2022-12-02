import { Driver } from "src/drivers/interfaces/drivers.interface";
import { Truck } from "src/garage/interfaces/truck.interface";

export type OrderDto = {
    weight: number;
    cepIn: string;
    cepOut: string;
}

export type OrderModel = {
    _id?: string;
    desc: string;
    weight: number;
    addressin: string;
    cepin: string;
    addressout: string;
    cepout: string;
    status?: boolean;
    statusdesc?: string;
    driver?: Driver;
    truck?: Truck;
    price?: number;
    distance?: string;
    accepted?: boolean;
}

export type OrderUpdateDto = {
    driver: Driver;
    truck: Truck;
}

export type OrderAdd = {
    desc: string;
    weight: number;
    addressin: string;
    cepin: string;
    addressout: string;
    cepout: string;
}

export type AcceptOrder = {
    orderId: string;
    accepted: boolean;
}

export type UpdateOrderDesc = {
    orderId: string;
    statusDesc: string;
}