const subbtn = document.querySelector("#subbtn");
const birthday = document.querySelector("#birthday");
const result = document.querySelector("#result");

subbtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!birthday.value) {
    result.textContent = "Please enter your birthday";
    return;
  }

  const dob = new Date(birthday.value);
  const today = new Date();

  if (dob > today) {
    result.textContent = "Please enter a valid date";
    return;
  }

  let birthYear = dob.getFullYear();
  let birthMonth = dob.getMonth();
  let birthDate = dob.getDate();

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let currentDate = today.getDate();

  // Calculate age days
  if (birthDate > currentDate) {
    currentDate += new Date(currentYear, currentMonth, 0).getDate();
    currentMonth -= 1;
  }
  let ageDays = currentDate - birthDate;

  // Calculate age months
  if (birthMonth > currentMonth) {
    currentMonth += 12;
    currentYear -= 1;
  }
  let ageMonths = currentMonth - birthMonth;

  // Calculate age years
  let ageYears = currentYear - birthYear;

  result.textContent = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days.`;
});
