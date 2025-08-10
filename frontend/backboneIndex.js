import { CornCollection } from "./collections/CornCollection.js";
import { CornListView } from "./views/CornListView.js";

document.addEventListener("DOMContentLoaded", () => {
  const cornsData = [
    { id: 1, cornName: "Sweet Corn" },
    { id: 2, cornName: "Popcorn" },
    { id: 3, cornName: "Baby Corn" },
    { id: 4, cornName: "Flint Corn" }
  ];

  const cornCollection = new CornCollection(cornsData);

  const cornListEl = document.getElementById("corn-list");
  const cornListView = new CornListView({
    el: cornListEl,
    collection: cornCollection
  });

  cornListView.render();
});
