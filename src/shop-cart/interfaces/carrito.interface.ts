export interface CarInterface extends Document {
    readonly _id: string;
    readonly strName: string; 
    readonly strDescription: string;
    readonly createdAt: Date; 
}