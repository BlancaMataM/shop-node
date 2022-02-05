
export interface ShopInterface extends Document {
    readonly _id: string;
    readonly strName: string; 
    readonly strDescription: string;
    readonly blnActive: boolean;
    readonly createdAt: Date; 
}