const from = document.querySelector(".from");
const to = document.querySelector(".to");
let s = [];
async function getApi() {
  try {
    const res = await fetch("https://v6.exchangerate-api.com/v6/fbba4255cf3a271354a51e72/latest/USD");
    const data = await res.json();
    console.log(data);
    s = data.conversion_rates;
    Object.keys(s).forEach((key) => {
      const optionfrom = document.createElement("option");
      optionfrom.value = key;
      optionfrom.textContent = key;
      from.appendChild(optionfrom);
      const optionTo = document.createElement("option");
      optionTo.value = key;
      optionTo.textContent = key;
      to.appendChild(optionTo);
    });
    console.log(s);
  } catch (e) {
    console.log(e);
  }
}
getApi();
function converetCurrency() {
  const amount = document.querySelector(".amount").value;
  const resultP = document.querySelector(".result");
  if (amount && from.value && to.value) {
    fetch(`https://v6.exchangerate-api.com/v6/fbba4255cf3a271354a51e72/latest/${from.value}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.conversion_rates[to.value];
        const result = (amount * rate).toFixed(2);
        resultP.innerHTML = `${amount} ${from.value} = ${result} ${to.value}`;
      });
  }
}
