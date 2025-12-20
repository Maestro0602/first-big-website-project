const search = document.getElementById("search-input");
const brand = document.getElementById("brand-filter");
const year = document.getElementById("year-filter");
const sort = document.getElementById("sort-filter");
const active = document.getElementById("active-filters");

const container = document.getElementById("car-container");
let cars = [...document.querySelectorAll(".car-card")];

function applyFilters() {
  const s = search.value.toLowerCase();
  const b = brand.value;
  const y = year.value;

  active.innerHTML = "";

  cars.forEach(car => {
    const match =
      (!s || car.dataset.name.toLowerCase().includes(s)) &&
      (!b || car.dataset.brand === b) &&
      (!y || car.dataset.year === y);

    car.classList.toggle("hidden", !match);
  });

  if (s) addChip(`Search: ${s}`);
  if (b) addChip(b);
  if (y) addChip(y);

  if (!s && !b && !y) {
    active.innerHTML = "<span>No filters applied</span>";
  }
}

function addChip(text) {
  const chip = document.createElement("div");
  chip.className = "filter-chip";
  chip.textContent = text;
  active.appendChild(chip);
}

sort.addEventListener("change", () => {
  cars.sort((a, b) => {
    if (sort.value === "price-asc") return a.dataset.price - b.dataset.price;
    if (sort.value === "price-desc") return b.dataset.price - a.dataset.price;
    if (sort.value === "year-desc") return b.dataset.year - a.dataset.year;
    if (sort.value === "name-asc") return a.dataset.name.localeCompare(b.dataset.name);
  });
  cars.forEach(car => container.appendChild(car));
});

search.addEventListener("input", applyFilters);
brand.addEventListener("change", applyFilters);
year.addEventListener("change", applyFilters);
