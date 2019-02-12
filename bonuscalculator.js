document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const salary = document.getElementById('salary').value;
  const years = document.getElementById('years').value;
  const days = document.getElementById('days').value;

  inputs = document.getElementsByTagName('input');
  inputs = Array.from(inputs);
  for (let i = 0; i <= inputs.length - 1; i++) {
    if (!inputs[i].value.length) {
      alert('Some information is missing in ' + inputs[i].name);
      ok = false;
      break;
    } else {
      ok = true;
    }
  }

  console.log(ok);

  if (ok) {
    if (salary <= 0) {
      alert('Salary must be greater than 0');
      console.log('wrong salary');
    } else if (years < 0 || years > 35) {
      alert('Years must be between 0 and 35');
      console.log('wrong years');
    } else if (days <= 0 || days > 365) {
      alert('Days must be grater than 0 and less than 365 ');
      console.log('wrong days');
    } else {
      DelayButton();
      let salaryBonus;
      if (years == 0) {
        salForDays = (salary * 15) / 30;
        salaryBonus = parseFloat((days * salForDays) / 365);
      } else if (years > 0 && years <= 3) {
        salaryBonus = (salary * 15) / 30;
      } else if (years > 3 && years <= 10) {
        salaryBonus = (salary * 19) / 30;
      } else if (years > 10) {
        salaryBonus = (salary * 21) / 30;
      }
      /*salForDays = (salary * daysofsal) / 30;
      salaryBonus = parseFloat((days * salForDays) / 365).toFixed(2);*/

      document.getElementById('bonus-container').innerHTML = '';
      document.getElementById('bonus-container').innerHTML =
        '<h2>Your bonus is $ ' + salaryBonus.toFixed(2) + '</h2>';

      console.log(salaryBonus);
    }
  }
});

function DelayButton() {
  const submitButton = document.querySelector('#btnCalcular');
  submitButton.disabled = true;
  submitButton.textContent = 'Wait...';
  setTimeout(function() {
    submitButton.disabled = false;
    submitButton.textContent = 'Calculate';
  }, 2000);
  return false;
}

console.log(document.querySelector('form'));
