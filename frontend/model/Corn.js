export const Corn = Backbone.Model.extend({
  defaults: function () {
    return { purchases: 0 };
  },

  fetchPurchases: function () {
    return (async () => {
      try {
        const res = await fetch(`http://localhost:3000/me/purchases/${this.get("id")}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          this.set("purchases", 0);
          return;
        }
        const data = await res.json();
        this.set("purchases", data.purchases ?? 0);
      } catch (err) {
        this.set("purchases", 0);
      }
    })();
  },

  buyCorn: function () {
    return (async () => {
      try {
        const res = await fetch(`http://localhost:3000/buy-corn/${this.get("id")}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cornName: this.get("cornName") }),
          credentials: "include",
        });
        const data = await res.json();
        await this.fetchPurchases();
        return data.message || data.error || "";
      } catch (err) {
        return "Error al comprar.";
      }
    })();
  }
});
