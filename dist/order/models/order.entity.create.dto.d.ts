export declare class OrderCreateDTO {
    total: number;
    order_items: {
        product_title: string;
        price: number;
        quantity: number;
        product_id: number;
    }[];
}
