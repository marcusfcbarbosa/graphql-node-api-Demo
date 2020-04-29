'use strict'

import { Pet } from './pet.model';
import { Addres } from './addres.model';
import { CreditCard } from './CreditCard.model';
import { User } from './user.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public user: User,
        public pets:Pet[],
        public shippingAddress:Addres,
        public billingAddress: Addres,
        public crediCard: CreditCard) {
    }
}