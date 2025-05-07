interface ProductType {
    createdAt: string;
    departament: string;
    products: Record<string, any>; // Consider defining a more specific type for 'products'
    id: string;
}

interface Color {
    name: string;
    hex: string;
}

interface Products {
    createdAt: string;
    name: string;
    image: string;
    price: string;
    departament: string;
    material: string;
    description: string;
    colors: Color[];
    id: string;
    productTypeId: string;
}