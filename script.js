const DISCORD_URL = "https://discord.gg/3pwyn9aneG";

const products = {
  ranks: [
    {name:"VIP Rank", tag:"RANK / ENTRY", art:"VIP", desc:"A starter upgrade for your CRAZE MC journey.", inr:"₹99", usd:"$1.49"},
    {name:"Aura Rank", tag:"RANK / ELITE", art:"AURA", desc:"Stand out with an exclusive rank style.", inr:"₹199", usd:"$2.49"},
    {name:"MVP Rank", tag:"RANK / PREMIUM", art:"MVP", desc:"Extra prestige for dedicated players.", inr:"₹299", usd:"$3.99"},
    {name:"Legend Rank", tag:"RANK / LEGENDARY", art:"LEGEND", desc:"A premium rank for the CRAZE MC community.", inr:"₹499", usd:"$5.99"}
  ],
  keys: [
    {name:"Common Key", tag:"CRATE KEY", art:"COMMON", desc:"Open a crate and discover your rewards.", inr:"₹29", usd:"$0.39"},
    {name:"Rare Key", tag:"CRATE KEY", art:"RARE", desc:"A chance to unlock rare rewards.", inr:"₹59", usd:"$0.79"},
    {name:"Mythic Key", tag:"CRATE KEY", art:"MYTHIC", desc:"A special key for valuable crate rewards.", inr:"₹99", usd:"$1.29"}
  ],
  coins: [
    {name:"1,000 Coins", tag:"COIN PACKAGE", art:"1K", desc:"A small coin pack for your adventures.", inr:"₹49", usd:"$0.69"},
    {name:"2,500 Coins", tag:"COIN PACKAGE", art:"2.5K", desc:"Get more coins for your in-game needs.", inr:"₹99", usd:"$1.29"},
    {name:"5,000 Coins", tag:"COIN PACKAGE", art:"5K", desc:"A bigger coin package for players.", inr:"₹179", usd:"$2.29"}
  ]
};

const grid = document.getElementById("productGrid");
const modal = document.getElementById("buyModal");
const toast = document.getElementById("toast");

function renderProducts(category) {
  grid.innerHTML = products[category].map((item) => `
    <article class="product-card">
      <div class="product-art"><strong>${item.art}</strong></div>
      <div class="product-info">
        <span class="product-tag">${item.tag}</span>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="product-bottom">
          <div class="prices"><strong>${item.inr} <small>INR</small></strong><small>${item.usd} USD</small></div>
          <button class="buy-btn" data-name="${item.name}" data-inr="${item.inr}" data-usd="${item.usd}">BUY NOW ↗</button>
        </div>
      </div>
    </article>`).join("");
}

document.querySelectorAll(".store-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".store-tab").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

grid.addEventListener("click", event => {
  const button = event.target.closest(".buy-btn");
  if (!button) return;
  document.getElementById("modalProduct").textContent = button.dataset.name;
  document.getElementById("modalPrice").textContent = `${button.dataset.inr} INR / ${button.dataset.usd} USD`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });

document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("Copied: " + value);
    } catch {
      showToast("Please copy manually: " + value);
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".theme-choice").forEach(button => {
  button.addEventListener("click", () => {
    document.body.dataset.theme = button.dataset.theme === "red" ? "" : button.dataset.theme;
    document.querySelectorAll(".theme-choice").forEach(choice => choice.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));

renderProducts("ranks");
