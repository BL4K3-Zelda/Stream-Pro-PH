const services = [
  { name: "Amazon Prime Video", price: 99, tone: "prime", mark: "P", min: 1 },
  { name: "Spotify Premium", price: 99, tone: "spotify", mark: "S", min: 1 },
  { name: "Disney+ Premium", price: 99, tone: "disney", mark: "D+", min: 1 },
  { name: "Apple TV+", price: 119, tone: "apple", mark: "A", min: 1 },
  { name: "YouTube Premium", price: 119, tone: "youtube", mark: "▶", min: 1 },
  { name: "HBO Max Ultimate", price: 149, tone: "max", mark: "M", min: 1 },
  { name: "Netflix Premium", price: 199, tone: "netflix", mark: "N", min: 2 },
  { name: "NBA League Pass", price: 249, tone: "nba", mark: "NBA", min: 1 }
];

const grid = document.querySelector("#plans-grid");
const order = document.querySelector("#order");
const serviceSelect = document.querySelector("#service-select");
const profilesInput = document.querySelector("#profiles-input");
const monthsInput = document.querySelector("#months-input");
const totalOutput = document.querySelector("#order-total");
const summary = document.querySelector("#selection-summary");
let selectedIndex = 1;

function peso(value) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
}

function renderPlans() {
  grid.innerHTML = services.map((service, index) => `
    <article class="plan-card${index === selectedIndex ? " selected" : ""}">
      <div class="plan-card-top"><span class="service-icon ${service.tone}">${service.mark}</span><span class="per-month">/ month</span></div>
      <h3>${service.name}</h3><div class="price">₱${service.price}<small> / profile</small></div>
      <button class="select-button" type="button" data-plan="${index}">Choose plan <span>→</span></button>
    </article>`).join("");
}

function renderOptions() {
  serviceSelect.innerHTML = services.map((service, index) => `<option value="${index}">${service.name}</option>`).join("");
  serviceSelect.value = String(selectedIndex);
}

function updateEstimate() {
  const service = services[selectedIndex];
  profilesInput.min = String(service.min);
  profilesInput.value = String(Math.max(service.min, Number(profilesInput.value) || service.min));
  monthsInput.value = String(Math.max(1, Math.min(12, Number(monthsInput.value) || 1)));
  const profiles = Number(profilesInput.value);
  const months = Number(monthsInput.value);
  totalOutput.textContent = peso(service.price * profiles * months);
  summary.textContent = `Enter your contact details and copy this selection: ${service.name}, ${profiles} profile${profiles > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}.`;
}

function choosePlan(index, scroll = true) {
  selectedIndex = index;
  renderPlans();
  serviceSelect.value = String(index);
  updateEstimate();
  order.hidden = false;
  if (scroll) order.scrollIntoView({ behavior: "smooth" });
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-plan]");
  if (button) choosePlan(Number(button.dataset.plan));
});
serviceSelect.addEventListener("change", () => choosePlan(Number(serviceSelect.value), false));
profilesInput.addEventListener("input", updateEstimate);
monthsInput.addEventListener("input", updateEstimate);
document.querySelectorAll(".js-start").forEach(button => button.addEventListener("click", () => choosePlan(selectedIndex)));
document.querySelectorAll(".js-browse").forEach(button => button.addEventListener("click", () => document.querySelector("#plans").scrollIntoView({ behavior: "smooth" })));

renderPlans();
renderOptions();
updateEstimate();
