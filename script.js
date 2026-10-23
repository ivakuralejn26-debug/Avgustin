// Текст левой колонки для каждого экрана
const SIDE = {
  1: { text: "Я хочу жить", lines: 60 },
  2: { text: "«… день родился он»", lines: 60 }, // TODO: вписать точный текст
};
const SCREENS = [1, 2]; // экраны 3 и 4 добавим позже

// Бесшовная лента: группа строк дублируется, CSS сдвигает на -50% -> 0
document.querySelectorAll(".track").forEach((t) => {
  const { text, lines } = SIDE[t.dataset.side];
  const group = "<div>" + `<p>${text}</p>`.repeat(lines) + "</div>";
  t.innerHTML = group + group;
});

// Счётчик символов в биографии
const bio = document.getElementById("bio");
document.getElementById("count").textContent =
  bio.textContent.replace(/\s+/g, " ").trim().length;

// Переключение экранов
function go(n) {
  if (!SCREENS.includes(n)) return;
  document.body.dataset.screen = n;
  document.querySelectorAll(".btns button").forEach((b) =>
    b.setAttribute("aria-current", String(Number(b.dataset.go) === n))
  );
  try { history.replaceState(null, "", n === 1 ? location.pathname : "#" + n); } catch (e) {}
}

document.querySelector(".btns").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) go(Number(b.dataset.go));
});

go(location.hash === "#2" ? 2 : 1);
