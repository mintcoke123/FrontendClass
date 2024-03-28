const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");

// container.style.display = "none";
messageContainer.innerHTML = "<h3>d-day를 입력해 주세요</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const counterMaker = function (data) {
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    messageContainer.innerHTML = "<h3>잘못된 시간대</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  let i = 0;
  for (let tag of documentArr) {
    document.getElementById(tag).innerHTML = remainingObj[timeKeys[i]];
    i++;
  }
};

const intervalIdArr = [];

const starter = function () {
  const targetDateInput = dateFormMaker();
  container.style.display = "flex";
  messageContainer.style.display = "none";
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
  console.log(intervalIdArr);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "flex";
  messageContainer.innerHTML = "<h3>d-day를 입력해 주세요</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};
