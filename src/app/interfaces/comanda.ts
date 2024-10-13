import { IProduct } from "./product";

export interface IComanda {
    id      : number;
    ocupado : boolean;
}

export interface IClienteComanda {
    id    : number;
    // name  : string;
}

export interface IClienteProductComanda {
    products: IProductComanda[];
    cliente : IClienteComanda;
}

export interface IProductComanda extends IProduct{
    quantity: number;
    total   : number;
}