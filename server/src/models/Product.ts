import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecifications {
  material: string;
  dimensions: string;
  thickness: string;
  units_per_package: number;
  color: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  specifications: ISpecifications;
  createdAt: Date;
  updatedAt: Date;
}

const SpecificationsSchema = new Schema<ISpecifications>({
  material: { type: String, required: true },
  dimensions: { type: String, required: true },
  thickness: { type: String, required: true },
  units_per_package: { type: Number, required: true },
  color: { type: String, required: true }
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['industrial', 'eco', 'food'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    specifications: {
      type: SpecificationsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema); 