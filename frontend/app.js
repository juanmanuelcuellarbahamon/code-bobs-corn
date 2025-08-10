const API_URL = "http://localhost:3000";

const corns = [
  { id: 1, cornName: "Sweet Corn" },
  { id: 2, cornName: "Popcorn" },
  { id: 3, cornName: "Baby Corn" },
  { id: 4, cornName: "Flint Corn" },
];

async function getPurchaseCount(cornId) {
  try {
    const res = await fetch(`${API_URL}/me/purchases/${cornId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.purchases ?? 0;
  } catch {
    return 0;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const cornList = document.getElementById("corn-list");
  const message = document.getElementById("message");

  for (const corn of corns) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = corn.cornName;

    const countLabel = document.createElement("p");
    countLabel.className = "count";
    countLabel.textContent = `Purchased: ${await getPurchaseCount(corn.id)}`;

    const btn = document.createElement("button");
    btn.textContent = `Buy ${corn.cornName}`;
    btn.className = "button";

    btn.addEventListener("click", async () => {
      const res = await fetch(`${API_URL}/buy-corn/${corn.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cornName: corn.cornName }),
        credentials: "include",
      });

      const data = await res.json();
      message.textContent = data.message || data.error;

      countLabel.textContent =
        `Purchased: ${await getPurchaseCount(corn.id)}`;
    });

    card.append(title, countLabel, btn);
    cornList.appendChild(card);
  }
});
