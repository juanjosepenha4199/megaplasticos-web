export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    specifications: {
        material: string;
        dimensions: string;
        thickness: string;
        units_per_package: number;
        color: string;
    };
}
