export class Order {
    constructor(
        public id: string,
        public recipient: {name: string, email: string},
        public delivery: {courier: string, method: string},
        public charge_customer: {currency: string, total_price: string},
        public created_at: Date,
        public items: Array<OrderItem>,
    ) {}

    public getTotalPrice(): number {
        return this.items.reduce((sum, i) => sum + Number(i.total_price.amount), 0);
    }

    static fromJSON(json: OrderJSON): Order {
      const order = Object.create(Order.prototype);
      return Object.assign(order, json);
    }

    toJSON(): OrderJSON {
      return Object.assign({}, this);
    }
}

export class OrderItem {
    id: string;
    name: string;
    quantity: number;
    total_price: {
        currency: string,
        amount: number
    }
}

export interface OrderJSON {
    id: string,
    recipient: {name: string, email: string},
    delivery: {courier: string, method: string},
    charge_customer: {currency: string, total_price: string},
    created_at: Date,
    items: Array<OrderItem>
}