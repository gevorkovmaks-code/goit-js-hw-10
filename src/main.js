import {PREP_TIME} from "./js/menu.js"

const from = document.querySelector(".form")
const orderLog = document.querySelector(".order-log")

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const addOrderRow = (drinkName) => { 
    const addLi = document.createElement("li")
    addLi.classList.add("row-pending")
    addLi.textContent = `⏳ ${drinkName} · у роботі…`
orderLog.appendChild(addLi)
return addLi
}

from.addEventListener('submit', (event) => {
    
event.preventDefault();
const formData = new FormData(event.currentTarget)
const drink = formData.get('drink')
const state = formData.get('state')

const delay = PREP_TIME[drink]
const shouldResolve = state === "fulfilled"

const row = addOrderRow(drink);

makeOrder(delay, shouldResolve)
    .then((delay) => {
      row.classList.remove("row-pending");
      row.classList.add("row-ok");
      row.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch((delay) => {
      row.classList.remove("row-pending");
      row.classList.add("row-err");
      row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      const timeString = new Date().toLocaleTimeString("uk-UA");
      row.textContent += ` · ${timeString}`;
    });
});