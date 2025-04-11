export interface Specifications {
    material: string;
    dimensions: string;
    thickness: string;
    units_per_package: number;
    color: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    specifications: Specifications;
}
