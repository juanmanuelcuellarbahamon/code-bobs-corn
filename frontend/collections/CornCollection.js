import { Corn } from "../model/Corn.js";

export const CornCollection = Backbone.Collection.extend({
  model: Corn
});