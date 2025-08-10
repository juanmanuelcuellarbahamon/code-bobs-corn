export const CornView = Backbone.View.extend({
  tagName: "div",
  className: "card",

  events: {
    "click button.buy": "onBuyClick"
  },

  initialize: function (options) {
    this.messageEl = options.messageEl;
    this.listenTo(this.model, "change:purchases", this.renderPurchases);
  },

  onBuyClick: async function () {
    if (!this.messageEl) return;
    const msg = await this.model.buyCorn();
    this.messageEl.textContent = msg;
  },

  renderPurchases: function () {
    const countLabel = this.el.querySelector(".count");
    if (countLabel) {
      countLabel.textContent = `Purchased: ${this.model.get("purchases")}`;
    }
  },

  render: function () {
    this.el.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = this.model.get("cornName") || "";

    const countLabel = document.createElement("p");
    countLabel.className = "count";
    countLabel.textContent = `Purchased: ${this.model.get("purchases")}`;

    const btn = document.createElement("button");
    btn.textContent = `Buy ${this.model.get("cornName")}`;
    btn.className = "button buy";

    this.el.appendChild(title);
    this.el.appendChild(countLabel);
    this.el.appendChild(btn);

    this.renderPurchases();

    return this;
  }
});
