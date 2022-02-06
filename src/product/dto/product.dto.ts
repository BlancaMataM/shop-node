export class CreateProductDTO {
    readonly _id: string;
    readonly strName: string; 
    readonly strDescription: string;
    readonly strFile: string;
    readonly nmbPrice: number; 
    readonly blnActive: boolean;
    readonly createdAt: Date; 
}

