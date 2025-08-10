import { CornView } from "./CornView.js";

export const CornListView = Backbone.View.extend({
  render: function () {
    this.el.innerHTML = "";

    this.collection.each((corn) => {
      const cornView = new CornView({
        model: corn,
        messageEl: document.getElementById("message")
      });
      this.el.appendChild(cornView.render().el);
    });

    return this;
  }
});
