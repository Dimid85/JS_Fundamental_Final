let registrationForm = document.getElementById("registration-form");
let createNewHomeButton = document.getElementById("create-new-home");
let sensorSelectionForm = document.getElementById("sensor-selection-form");
let selectedSensorsContainer = document.getElementById(
  "selected-sensors-container"
);
let submitSensorsButton = document.getElementById("submit-sensors");

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

/**** */
let motionStateButton = document.getElementById('motionStateButton');
let waterStateButton = document.getElementById('waterStateButton');
let gasStateButton = document.getElementById('gasStateButton');
let lightStateButton = document.getElementById('lightStateButton');
let heatingStateButton = document.getElementById('heatingStateButton');
let tvStateButton = document.getElementById('tvStateButton');

/**** */

function createSensorButtons(selectedSensors) {
  selectedSensorsContainer.innerHTML = "";

  selectedSensors.forEach(function (sensor) {
    let sensorButtonsContainer = document.createElement("div");
    sensorButtonsContainer.classList.add("sensor-buttons-container");

    let sensorButton = document.createElement("button");
    sensorButton.textContent = sensor;
    sensorButton.classList.add("sensor-button");

    let viewStateButton = document.createElement("button");
    viewStateButton.textContent = "Переглянути стан";
    viewStateButton.classList.add("state-button");

    let changeStateButton = document.createElement("button");
    changeStateButton.textContent = "Змінити стан";
    changeStateButton.classList.add("state-button");

    let saveStateButton = document.createElement("button");
    saveStateButton.textContent = "Зберегти стан";
    saveStateButton.classList.add("state-button");

    viewStateButton.addEventListener("click", function () {
      alert("Перегляд стану датчика " + sensor);
    });

    changeStateButton.addEventListener("click", function () {
      let newName = prompt("Введіть нове ім'я для датчика");
      if (newName) {
        sensor.setName(newName);
        let state = sensor.getState();
        alert(
          "Ім'я датчика: " +
            state.name +
            ", Стан: " +
            (state.enabled ? "Включений" : "Виключений")
        );
      }
    });

    viewStateButton.addEventListener("click", function () {
      let state = sensor.getState();
      alert(
        "Ім'я датчика: " +
          state.name +
          ", Стан: " +
          (state.enabled ? "Включений" : "Виключений")
      );
    });

    saveStateButton.addEventListener("click", function () {
      alert("Збереження стану датчика " + sensor);
    });

    sensorButtonsContainer.appendChild(sensorButton);
    sensorButtonsContainer.appendChild(viewStateButton);

    sensorButton = document.createElement("button");
    sensorButton.textContent = sensor.name;
    sensorButton.classList.add("sensor-button");

    viewStateButton = document.createElement("button");
    viewStateButton.textContent = "Переглянути стан";
    viewStateButton.classList.add("state-button");

    changeStateButton = document.createElement("button");
    changeStateButton.textContent = "Змінити стан";
    changeStateButton.classList.add("state-button");

    saveStateButton = document.createElement("button");
    saveStateButton.textContent = "Зберегти стан";
    saveStateButton.classList.add("state-button");

    let motionStateButton = document.getElementById("motion-state-button");
    let waterStateButton = document.getElementById("water-state-button");
    let gasStateButton = document.getElementById("gas-state-button");
    let lightStateButton = document.getElementById("light-state-button");
    let lightBrightnessInput = document.getElementById(
      "light-brightness-input"
    );
    let lightColorInput = document.getElementById("light-color-input");
    let changeLightSettingsButton = document.getElementById(
      "change-light-settings-button"
    );
    let heatingStateButton = document.getElementById("heating-state-button");
    let heatingTemperatureInput = document.getElementById(
      "heating-temperature-input"
    );
    let changeHeatingSettingsButton = document.getElementById(
      "change-heating-settings-button"
    );
    let tvStateButton = document.getElementById("tv-state-button");
    let tvVolumeInput = document.getElementById("tv-volume-input");
    let tvResolutionInput = document.getElementById("tv-resolution-input");
    let tvChannelInput = document.getElementById("tv-channel-input");
    let changeTVSettingsButton = document.getElementById(
      "change-tv-settings-button"
    );

    viewStateButton.addEventListener("click", function () {
      alert("Перегляд стану датчика " + sensor.name);
    });

    changeStateButton.addEventListener("click", function () {
      let newName = prompt("Введіть нове ім'я для датчика");
      if (newName) {
        sensor.setName(newName);
        let state = sensor.getState();
        alert(
          "Ім'я датчика: " +
            state.name +
            ", Стан: " +
            (state.enabled ? "Включений" : "Виключений")
        );
      }
    });

    viewStateButton.addEventListener("click", function () {
      let state = sensor.getState();
      alert(
        "Ім'я датчика: " +
          state.name +
          ", Стан: " +
          (state.enabled ? "Включений" : "Виключений")
      );
    });

    saveStateButton.addEventListener("click", function () {
      alert("Збереження стану датчика " + sensor.name);
    });

    sensorButtonsContainer.appendChild(sensorButton);
    sensorButtonsContainer.appendChild(viewStateButton);
    sensorButtonsContainer.appendChild(changeStateButton);
    sensorButtonsContainer.appendChild(saveStateButton);

    selectedSensorsContainer.appendChild(sensorButtonsContainer);
  });

  motionStateButton.addEventListener("click", function () {
    motionSensor.toggleState();
  });

  waterStateButton.addEventListener("click", function () {
    waterSensor.toggleState();
  });

  gasStateButton.addEventListener("click", function () {
    gasSensor.toggleState();
  });

  lightStateButton.addEventListener("click", function () {
    lightSensor.toggleState();
  });

  heatingStateButton.addEventListener("click", function () {
    heatingSensor.toggleState();
  });

  tvStateButton.addEventListener("click", function () {
    tvRemote.toggleState();
  });

  changeLightSettingsButton.addEventListener("click", function () {
    let brightness = parseInt(lightBrightnessInput.value);
    let color = lightColorInput.value;
    lightSensor.setBrightness(brightness);
    lightSensor.setColor(color);
    alert("Зміни до датчика світла збережено");
  });

  changeHeatingSettingsButton.addEventListener("click", function () {
    let temperature = parseInt(heatingTemperatureInput.value);
    heatingSensor.setTemperature(temperature);
    alert("Зміни до датчика опалення збережено");
  });

  changeTVSettingsButton.addEventListener("click", function () {
    let volume = parseInt(tvVolumeInput.value);
    let resolution = tvResolutionInput.value;
    let channelIndex = parseInt(tvChannelInput.value);
    tvRemote.setVolume(volume);
    tvRemote.setResolution(resolution);
    tvRemote.changeChannel(channelIndex);
    alert("Зміни до пульта телевізора збережено");
  });

  // Клас для датчика руху
class MotionSensor {
   constructor(name) {
     this.name = name;
     this.enabled = false;
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Датчик руху спрацював');
     }
   }
 
   setName(name) {
     this.name = name;
   }
 
   getState() {
     return {
       name: this.name,
       enabled: this.enabled
     };
   }
 }
 
 // Клас для датчика води
 class WaterSensor {
   constructor(name) {
     this.name = name;
     this.enabled = false;
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Датчик води спрацював');
     }
   }
 
   getState() {
     return {
       name: this.name,
       enabled: this.enabled
     };
   }
 }
 
 // Клас для датчика газу
 class GasSensor {
   constructor(name) {
     this.name = name;
     this.enabled = false;
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Датчик газу спрацював');
     }
   }
 
   getState() {
     return {
       name: this.name,
       enabled: this.enabled
     };
   }
 }
 
 // Клас для датчика світла
 class LightSensor {
   constructor(name) {
     this.name = name;
     this.enabled = false;
     this.brightness = 0;
     this.color = 'білий';
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Датчик світла спрацював');
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
       color: this.color
     };
   }
 }
 
 // Клас для датчика опалення
 class HeatingSensor {
   constructor(name) {
     this.name = name;
     this.enabled = false;
     this.temperature = 0;
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Датчик опалення спрацював');
     }
   }
 
   setTemperature(temperature) {
     this.temperature = temperature;
   }
 
   getState() {
     return {
       name: this.name,
       enabled: this.enabled,
       temperature: this.temperature
     };
   }
 }
 
 // Клас для пульта телевізора
 class TvRemote {
   constructor(name) {
     this.name = name;
     this.enabled = false;
     this.channel = '1+1';
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Пульт телевізора спрацював');
     }
   }
 
   setChannel(channel) {
     this.channel = channel;
   }
 
   getState() {
     return {
       name: this.name,
       enabled: this.enabled,
       channel: this.channel
     };
   }
 }
 
 // Оголошення змінних кнопок
 /*let motionStateButton = document.getElementById('motionStateButton');
 let waterStateButton = document.getElementById('waterStateButton');
 let gasStateButton = document.getElementById('gasStateButton');
 let lightStateButton = document.getElementById('lightStateButton');
 let heatingStateButton = document.getElementById('heatingStateButton');
 let tvStateButton = document.getElementById('tvStateButton');*/
 
 // Оголошення датчиків
 let motionSensor = new MotionSensor('Датчик руху');
 let waterSensor = new WaterSensor('Датчик води');
 let gasSensor = new GasSensor('Датчик газу');
 let lightSensor = new LightSensor('Датчик світла');
 let heatingSensor = new HeatingSensor('Датчик опалення');
 let tvRemote = new TvRemote('Пульт телевізора');
 
 // Функція для створення кнопок датчиків
 function createSensorButtons() {
   motionStateButton.addEventListener('click', function() {
     motionSensor.toggleState();
     console.log(motionSensor.getState());
   });
 
   waterStateButton.addEventListener('click', function() {
     waterSensor.toggleState();
     console.log(waterSensor.getState());
   });
 
   gasStateButton.addEventListener('click', function() {
     gasSensor.toggleState();
     console.log(gasSensor.getState());
   });
 
   lightStateButton.addEventListener('click', function() {
     lightSensor.toggleState();
     console.log(lightSensor.getState());
   });
 
   heatingStateButton.addEventListener('click', function() {
     heatingSensor.toggleState();
     console.log(heatingSensor.getState());
   });
 
   tvStateButton.addEventListener('click', function() {
     tvRemote.toggleState();
     console.log(tvRemote.getState());
   });
 }
 
 // Виклик функції для створення кнопок датчиків
 createSensorButtons();
}