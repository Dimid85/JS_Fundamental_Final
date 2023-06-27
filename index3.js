let registrationForm = document.getElementById("registration-form");
let createNewHomeButton = document.getElementById("create-new-home");
let sensorSelectionForm = document.getElementById("sensor-selection-form");
let selectedSensorsContainer = document.getElementById("selected-sensors-container");
let submitSensorsButton = document.getElementById("submit-sensors");

// Отримання даних користувача та налаштувань дому з local storage
let userData = JSON.parse(localStorage.getItem("userData")) || {};
let homeSettings = JSON.parse(localStorage.getItem("homeSettings")) || {};

sensorSelectionForm.style.display = "none";

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = validateRegistrationForm();

  if (isValid) {
    createNewHomeButton.style.display = "block";
    registrationForm.style.display = "none";
    saveUserData(); // Зберегти дані користувача в local storage
  }
});

createNewHomeButton.addEventListener("click", function (event) {
  event.preventDefault();
  sensorSelectionForm.style.display = "block";
  createNewHomeButton.style.display = "none";
});

submitSensorsButton.addEventListener("click", function (event) {
  event.preventDefault();
  let selectedSensors = getSelectedSensors();
  createSensorButtons(selectedSensors);
  alert("Новий дім створено!");
  sensorSelectionForm.reset();
  sensorSelectionForm.style.display = "none";
  createNewHomeButton.style.display = "block";
  saveHomeSettings(); // Зберегти налаштування дому в local storage
});

function validateRegistrationForm() {
  // Валідація форми реєстрації
  return true;
}

function getSelectedSensors() {
  let selectedSensors = [];
  let sensorCheckboxes = document.getElementsByName("sensor");

  for (let i = 0; i < sensorCheckboxes.length; i++) {
    if (sensorCheckboxes[i].checked) {
      selectedSensors.push(sensorCheckboxes[i].value);
    }
  }

  return selectedSensors;
}

class MotionSensor {
  // Класи датчиків
  constructor(name) {
    this.name = name;
    this.enabled = false;
  }

  toggleState() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      alert("Датчик руху спрацював");
    }
  }

  setName(name) {
    this.name = name;
  }

  getState() {
    return {
      name: this.name,
      enabled: this.enabled,
    };
  }
}


sensorSelectionForm.style.display = "none";

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = validateRegistrationForm();

  if (isValid) {
    createNewHomeButton.style.display = "block";
    registrationForm.style.display = "none";
  }
});

createNewHomeButton.addEventListener("click", function (event) {
  event.preventDefault();
  sensorSelectionForm.style.display = "block";
  createNewHomeButton.style.display = "none";
});

submitSensorsButton.addEventListener("click", function (event) {
  event.preventDefault();
  let selectedSensors = getSelectedSensors();
  createSensorButtons(selectedSensors);
  alert("Новий дім створено!");
  sensorSelectionForm.reset();
  sensorSelectionForm.style.display = "none";
  createNewHomeButton.style.display = "block";
});

function validateRegistrationForm() {
  return true;
}

function getSelectedSensors() {
  let selectedSensors = [];
  let sensorCheckboxes = document.getElementsByName("sensor");

  for (let i = 0; i < sensorCheckboxes.length; i++) {
    if (sensorCheckboxes[i].checked) {
      selectedSensors.push(sensorCheckboxes[i].value);
    }
  }

  return selectedSensors;
}



class WaterSensor {
  constructor(name) {
    this.name = name;
    this.enabled = false;
  }

  toggleState() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      alert("Датчик води спрацював");
    }
  }

  getState() {
    return {
      name: this.name,
      enabled: this.enabled,
    };
  }
}

class GasSensor {
  constructor(name) {
    this.name = name;
    this.enabled = false;
  }

  toggleState() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      alert("Датчик газу спрацював");
    }
  }

  getState() {
    return {
      name: this.name,
      enabled: this.enabled,
    };
  }
}

class LightSensor {
  constructor(name) {
    this.name = name;
    this.enabled = false;
    this.brightness = 0;
    this.color = "white";
  }

  toggleState() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      alert("Датчик світла спрацював");
    }
  }

  setBrightness(brightness) {
    this.brightness = brightness;
  }

  setColor(color) {
    this.color = color;
  }

  getState() {
    return {
      name: this.name,
      enabled: this.enabled,
      brightness: this.brightness,
      color: this.color,
    };
  }
}

function createSensorButtons(selectedSensors) {
  selectedSensorsContainer.innerHTML = "";

  for (let i = 0; i < selectedSensors.length; i++) {
    let sensorName = selectedSensors[i];
    let sensor;

    switch (sensorName) {
      case "motion":
        sensor = new MotionSensor(sensorName);
        break;
      case "water":
        sensor = new WaterSensor(sensorName);
        break;
      case "gas":
        sensor = new GasSensor(sensorName);
        break;
      case "light":
        sensor = new LightSensor(sensorName);
        break;
    }

    let button = document.createElement("button");
    button.innerText = `Включити/виключити ${sensorName}`;
    button.addEventListener("click", function () {
      sensor.toggleState();
    });

    selectedSensorsContainer.appendChild(button);
  }
}

function createSensorButtons(selectedSensors) {
  selectedSensorsContainer.innerHTML = "";

  for (let i = 0; i < selectedSensors.length; i++) {
    let sensorName = selectedSensors[i];
    let sensor;

    switch (sensorName) {
      case "motion":
        sensor = new MotionSensor(sensorName);
        break;
      case "water":
        sensor = new WaterSensor(sensorName);
        break;
      case "gas":
        sensor = new GasSensor(sensorName);
        break;
      case "light":
        sensor = new LightSensor(sensorName);
        break;
    }

    let button = document.createElement("button");
    button.innerText = `Включити/виключити ${sensorName}`;
    button.addEventListener("click", function () {
      sensor.toggleState();
    });

    selectedSensorsContainer.appendChild(button);
  }
}

// Збереження даних користувача в local storage
function saveUserData() {
  userData = {
    // Отримання та збереження даних з форми реєстрації (приклад)
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

// Збереження налаштувань дому в local storage
function saveHomeSettings() {
  homeSettings = {
    // Отримання та збереження налаштувань дому (приклад)
    homeName: document.getElementById("home-name").value,
    homeLocation: document.getElementById("home-location").value,
  };
  localStorage.setItem("homeSettings", JSON.stringify(homeSettings));
}