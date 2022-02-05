

export interface ProductInterface extends Document {
    readonly productID: string;
    readonly strName: string; 
    readonly strDescription: string;
    readonly strFile: string;
    readonly nmbPrice: number; 
    readonly blnActive: boolean;
    readonly createdAt: Date; 
}