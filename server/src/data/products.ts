import { Product } from '../types/product';

export const products: Product[] = [
    {
        _id: 'sh_3x2.5_m',
        name: 'Bolsa Selle Hermético 3x2,5 MILLAR',
        description: 'Bolsa con selle hermético de alta resistencia, ideal para almacenamiento seguro',
        category: 'Bolsa selle hermético',
        price: 14300,
        stock: 1000,
        image: '/images/products/sellehermetico3x2.jpg',
        specifications: {
            material: 'Polietileno de alta densidad',
            dimensions: '3cmx2,5cm',
            thickness: '40 micras',
            units_per_package: 10,
            color: 'Transparente',
        },
    },
    {
        _id: 'sh_3x2.5_p',
        name: 'Bolsa Selle Hermético 3x2,5 PAQUETE',
        description: 'Bolsa con selle hermético de alta resistencia, ideal para almacenamiento seguro',
        category: 'Bolsa selle hermético',
        price: 1600,
        stock: 1000,
        image: '/images/products/sellehermetico3x2.jpg',
        specifications: {
            material: 'Polietileno de alta densidad',
            dimensions: '3cmx2,5cm',
            thickness: '40 micras',
            units_per_package: 10,
            color: 'Transparente',
        },
    }
];
