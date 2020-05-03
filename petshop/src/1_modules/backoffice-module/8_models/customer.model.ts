'use strict'

import { Pet } from './pet.model';
import { Address } from './addres.model';
import { CreditCard } from './CreditCard.model';
import { User } from './user.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public user: User,
        public pets:Pet[],
        public shippingAddress:Address,
        public billingAddress: Address,
        public crediCard: CreditCard) {
    }
}