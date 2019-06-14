export class Customer {
    constructor(
        public id: string,
        public name: string,
        public email: string
      ) { }

    static fromJSON(json: CustomerJSON): Customer {
      const customer = Object.create(Customer.prototype);
      return Object.assign(customer, json);
    }

    toJSON(): CustomerJSON {
      return Object.assign({}, this);
    }
}

interface CustomerJSON {
  id: string;
  name: string;
  email: string;
}
