import { Document, model, Schema } from "mongoose";

export type TRoute = {
  routeKey: string;
  title: string;
  description: string;
  gpx: string;
};

export interface IRoute extends TRoute, Document {}

const routeSchema: Schema = new Schema({
  routeKey: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  gpx: {
    type: String,
    required: true,
  }
});

const Route = model<IRoute>("Route", routeSchema);

export default Route;
