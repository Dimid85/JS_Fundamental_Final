// Отримання даних користувача та налаштувань дому з local storage
let userData = JSON.parse(localStorage.getItem("userData")) || {};
let homeSettings = JSON.parse(localStorage.getItem("homeSettings")) || {};

let registrationForm = document.getElementById("registration-form");
let createNewHomeButton = document.getElementById("create-new-home");
let sensorSelectionForm = document.getElementById("sensor-selection-form");
let selectedSensorsContainer = document.getElementById("selected-sensors-container");
let submitSensorsButton = document.getElementById("submit-sensors");

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

//--------------
// ...

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
 
     let configureButton = document.createElement("button");
     configureButton.innerText = `Налаштувати датчик ${sensorName}`;
     configureButton.classList.add("configure-sensor");
     configureButton.setAttribute("data-sensor", sensorName);
     configureButton.style.display = "none"; // Приховуємо кнопку налаштування датчика
 
     selectedSensorsContainer.appendChild(button);
     selectedSensorsContainer.appendChild(configureButton);
   }
 
   // Показуємо кнопку налаштування датчика після вибору датчика
   let configureSensorButtons = document.getElementsByClassName("configure-sensor");
   for (let i = 0; i < configureSensorButtons.length; i++) {
     configureSensorButtons[i].style.display = "inline-block";
   }
 }
 
 // ...
 
 // Додати обробник подій для кожної кнопки "Налаштувати датчик"
 /*let configureSensorButtons = document.getElementsByClassName("configure-sensor");
 for (let i = 0; i < configureSensorButtons.length; i++) {
   configureSensorButtons[i].addEventListener("click", function () {
     let sensorName = this.getAttribute("data-sensor");
     configureSensor(sensorName);
   });
 }*/
 
 // ...
 
 // Функція налаштування датчика
 function configureSensor(sensorName) {
    let sensorSettingsContainer = document.getElementById(`${sensorName}-settings`);
    //****************
// Додати обробник подій для кнопки "Налаштувати датчик руху"
let motionSensorConfigureButton = document.getElementById("motion-sensor-configure");
motionSensorConfigureButton.addEventListener("click", function () {
  configureSensor("motion");
});

// Додати обробник подій для кнопки "Налаштувати датчик води"
let waterSensorConfigureButton = document.getElementById("water-sensor-configure");
waterSensorConfigureButton.addEventListener("click", function () {
  configureSensor("water");
});

// Додати обробник подій для кнопки "Налаштувати датчик газу"
let gasSensorConfigureButton = document.getElementById("gas-sensor-configure");
gasSensorConfigureButton.addEventListener("click", function () {
  configureSensor("gas");
});

// Додати обробник подій для кнопки "Налаштувати датчик світла"
let lightSensorConfigureButton = document.getElementById("light-sensor-configure");
lightSensorConfigureButton.addEventListener("click", function () {
  configureSensor("light");
});

   //******************
   if (sensorSettingsContainer) {
     sensorSettingsContainer.style.display = "block";
     return;
   }
 
   sensorSettingsContainer = document.createElement("div");
   sensorSettingsContainer.id = `${sensorName}-settings`;
   sensorSettingsContainer.innerHTML = `
     <h4>Налаштування датчика ${sensorName}</h4>
     <label for="${sensorName}-phone">Номер телефону:</label>
     <input type="text" name="${sensorName}-phone" id="${sensorName}-phone" required>
     <br>
     <button id="${sensorName}-save-settings">Зберегти</button>
   `;
 
   selectedSensorsContainer.appendChild(sensorSettingsContainer);
 
   // Додати обробник події для кнопки "Зберегти" налаштування датчика
   let saveSettingsButton = document.getElementById(`${sensorName}-save-settings`);
   saveSettingsButton.addEventListener("click", function () {
     saveSensorSettings(sensorName);
   });
 }
 
 // ...
 
//--------------

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

/*function createSensorButtons(selectedSensors) {
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
}*/

// Збереження даних користувача в local storage
function saveUserData() {
  userData = {
    name: document.getElementById("name").value,
     email: document.getElementById("email").value,
     surname: document.getElementById("surname").value,
     phone:document.getElementById("phone").value,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

// Збереження налаштувань дому в local storage
function saveHomeSettings() {
  homeSettings = {
    homeName: document.getElementById("home-name").value,
    homeLocation: document.getElementById("home-location").value,
  };
  localStorage.setItem("homeSettings", JSON.stringify(homeSettings));
}



//--------------------
// ...

// Додати обробник подій для кожної кнопки "Налаштувати датчик"
/*let configureSensorButtons = document.getElementsByClassName("configure-sensor");
for (let i = 0; i < configureSensorButtons.length; i++) {
  configureSensorButtons[i].addEventListener("click", function () {
    let sensorName = this.getAttribute("data-sensor");
    configureSensor(sensorName);
  });
}*/
// Функція налаштування датчика



function configureSensor(sensorName) {
  let sensorSettingsContainer = document.createElement("div");
  sensorSettingsContainer.id = `${sensorName}-settings`;
  sensorSettingsContainer.innerHTML = `
    <h4>Налаштування датчика ${sensorName}</h4>
    <label for="${sensorName}-phone">Номер телефону:</label>
    <input type="text" name="${sensorName}-phone" id="${sensorName}-phone" required>
    <br>
    <button id="${sensorName}-save-settings">Зберегти</button>
  `;

  selectedSensorsContainer.appendChild(sensorSettingsContainer);

  // Додати обробник події для кнопки "Зберегти" налаштування датчика
  let saveSettingsButton = document.getElementById(`${sensorName}-save-settings`);
  saveSettingsButton.addEventListener("click", function () {
    saveSensorSettings(sensorName);
  });
}

// Функція збереження налаштувань датчика
function saveSensorSettings(sensorName) {
   let selectedSensors = getSelectedSensors(); // Отримати список вибраних датчиків
   let phoneInput = document.getElementById(`${sensorName}-phone`);
   let phoneNumber = phoneInput.value;
 
   // Зберегти налаштування датчика у потрібному форматі або виконати інші дії
 
   // Очистити поля введення
   phoneInput.value = "";
 
   // Приклад: Вивести повідомлення про успішне збереження налаштувань
   console.log(`Налаштування датчика ${sensorName} збережено: Номер телефону - ${phoneNumber}`);
}
 

//--------------------