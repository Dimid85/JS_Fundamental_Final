 var registrationForm = document.getElementById('registration-form');
var createNewHomeButton = document.getElementById('create-new-home');
var sensorSelectionForm = document.getElementById('sensor-selection-form');
var selectedSensorsContainer = document.getElementById('selected-sensors-container');
var submitSensorsButton = document.getElementById('submit-sensors');


// Приховуємо форму вибору датчиків за допомогою CSS-стилю
sensorSelectionForm.style.display = 'none';

// Додаємо обробник події для подання форми реєстрації
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Перевіряємо, чи всі поля форми заповнені правильно
  var isValid = validateRegistrationForm();

  if (isValid) {
    // Показуємо кнопку "Створити новий дім"
    createNewHomeButton.style.display = 'block';

    // Ховаємо форму реєстрації
    registrationForm.style.display = 'none';
  }
});

// Обробник події для натискання кнопки "Створити новий дім"
createNewHomeButton.addEventListener('click', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку кнопки

  // Показуємо форму вибору датчиків
  sensorSelectionForm.style.display = 'block';

  // Ховаємо кнопку "Створити новий дім"
  createNewHomeButton.style.display = 'none';
});

submitSensorsButton.addEventListener('click', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку кнопки

  // Отримуємо вибрані датчики
  var selectedSensors = getSelectedSensors();

  // Створюємо кнопки для вибраних датчиків
  createSensorButtons(selectedSensors);

  // Виводимо повідомлення про успішне створення нового дому
  alert("Новий дім створено!");

  // Очищаємо форму вибору датчиків
  sensorSelectionForm.reset();

  // Ховаємо форму вибору датчиків
  sensorSelectionForm.style.display = 'none';

  // Показуємо кнопку "Створити новий дім"
  createNewHomeButton.style.display = 'block';
});

// Функція для перевірки правильності заповнення форми реєстрації
function validateRegistrationForm() {
  // Тут можна додати код для перевірки правильності заповнення полів форми
  // Повертаємо true, якщо форма заповнена правильно, або false в іншому випадку
  return true;
}

// Функція для отримання вибраних датчиків
function getSelectedSensors() {
  var selectedSensors = [];
  var sensorCheckboxes = document.getElementsByName('sensor');

  for (var i = 0; i < sensorCheckboxes.length; i++) {
    if (sensorCheckboxes[i].checked) {
      selectedSensors.push(sensorCheckboxes[i].value);
    }
  }

  return selectedSensors;
}


// Функція для створення кнопок для вибраних датчиків
function createSensorButtons(selectedSensors) {
   // Очищаємо контейнер з вибраними датчиками
   selectedSensorsContainer.innerHTML = '';
 
   // Створюємо кнопку для кожного вибраного датчика
   selectedSensors.forEach(function (sensor) {
     // Створюємо контейнер для кнопок датчика
     var sensorButtonsContainer = document.createElement('div');
     sensorButtonsContainer.classList.add('sensor-buttons-container');
 
     // Створюємо кнопку з назвою датчика
     var sensorButton = document.createElement('button');
     sensorButton.textContent = sensor.name;
     sensorButton.classList.add('sensor-button');
 
     // Створюємо кнопки для перегляду стану, зміни стану та збереження стану
     var viewStateButton = document.createElement('button');
     viewStateButton.textContent = 'Переглянути стан';
     viewStateButton.classList.add('state-button');
 
     var changeStateButton = document.createElement('button');
     changeStateButton.textContent = 'Змінити стан';
     changeStateButton.classList.add('state-button');
 
     var saveStateButton = document.createElement('button');
     saveStateButton.textContent = 'Зберегти стан';
     saveStateButton.classList.add('state-button');


     /******* */
// Елементи для датчиків руху
var motionStateButton = document.getElementById('motion-state-button');

// Елементи для датчиків води
var waterStateButton = document.getElementById('water-state-button');

// Елементи для датчиків газу
var gasStateButton = document.getElementById('gas-state-button');

// Елементи для датчиків світла
var lightStateButton = document.getElementById('light-state-button');
var lightBrightnessInput = document.getElementById('light-brightness-input');
var lightColorInput = document.getElementById('light-color-input');
var changeLightSettingsButton = document.getElementById('change-light-settings-button');

// Елементи для датчиків опалення
var heatingStateButton = document.getElementById('heating-state-button');
var heatingTemperatureInput = document.getElementById('heating-temperature-input');
var changeHeatingSettingsButton = document.getElementById('change-heating-settings-button');

// Елементи для пульта телевізора
var tvStateButton = document.getElementById('tv-state-button');
var tvVolumeInput = document.getElementById('tv-volume-input');
var tvResolutionInput = document.getElementById('tv-resolution-input');
var tvChannelInput = document.getElementById('tv-channel-input');
var changeTVSettingsButton = document.getElementById('change-tv-settings-button');

      /****** */
     // Додаємо обробники подій для кнопок стану
     viewStateButton.addEventListener('click', function () {
       alert('Перегляд стану датчика ' + sensor);
     });
 
     changeStateButton.addEventListener('click', function() {
      var newName = prompt('Введіть нове ім\'я для датчика');
      if (newName) {
        sensor.setName(newName);
        var state = sensor.getState();
        alert('Ім\'я датчика: ' + state.name + ', Стан: ' + (state.enabled ? 'Включений' : 'Виключений'));
      }
    });
    
    viewStateButton.addEventListener('click', function() {
      var state = sensor.getState();
      alert('Ім\'я датчика: ' + state.name + ', Стан: ' + (state.enabled ? 'Включений' : 'Виключений'));
    });
    
 
     saveStateButton.addEventListener('click', function () {
       alert('Збереження стану датчика ' + sensor);
     });
 
     // Додаємо кнопки до контейнера
     sensorButtonsContainer.appendChild(sensorButton);
     sensorButtonsContainer.appendChild(viewStateButton);
     sensorButtonsContainer.appendChild(changeStateButton);
     sensorButtonsContainer.appendChild(saveStateButton);
 
     // Додаємо контейнер з кнопками до контейнера з вибраними датчиками
     selectedSensorsContainer.appendChild(sensorButtonsContainer);
   });
 }

 
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
 }
 
 // Клас для пульта телевізора
 class TVRemote {
   constructor(name) {
     this.name = name;
     this.enabled = false;
     this.channels = [];
     this.volume = 0;
     this.resolution = '1024x768';
     this.currentChannel = 0;
   }
 
   toggleState() {
     this.enabled = !this.enabled;
     if (this.enabled) {
       alert('Пульт телевізора увімкнено');
     }
   }
 
   setChannels(channels) {
     this.channels = channels;
   }
 
   setVolume(volume) {
     this.volume = volume;
   }
 
   setResolution(resolution) {
     this.resolution = resolution;
   }
 
   changeChannel(index) {
     if (index >= 0 && index < this.channels.length) {
       this.currentChannel = index;
       alert('Переключено на канал ' + this.channels[index]);
     }
   }
 }
 
 // Створення екземплярів датчиків і пульта телевізора
 var motionSensor = new MotionSensor('Датчик руху');
 var waterSensor = new WaterSensor('Датчик води');
 var gasSensor = new GasSensor('Датчик газу');
 var lightSensor = new LightSensor('Датчик світла');
 var heatingSensor = new HeatingSensor('Датчик опалення');
 var tvRemote = new TVRemote('Пульт телевізора');
 let motionStateButton;
 
 // Додавання обробників подій для кнопок
 motionStateButton.addEventListener('click', function() {
   motionSensor.toggleState();
 });
 
 waterStateButton.addEventListener('click', function() {
   waterSensor.toggleState();
 });
 
 gasStateButton.addEventListener('click', function() {
   gasSensor.toggleState();
 });
 
 lightStateButton.addEventListener('click', function() {
   lightSensor.toggleState();
 });
 
 heatingStateButton.addEventListener('click', function() {
   heatingSensor.toggleState();
 });
 
 tvStateButton.addEventListener('click', function() {
   tvRemote.toggleState();
 });
 
 changeLightSettingsButton.addEventListener('click', function() {
   var brightness = parseInt(lightBrightnessInput.value);
   var color = lightColorInput.value;
   lightSensor.setBrightness(brightness);
   lightSensor.setColor(color);
   alert('Зміни до датчика світла збережено');
 });
 
 changeHeatingSettingsButton.addEventListener('click', function() {
   var temperature = parseInt(heatingTemperatureInput.value);
   heatingSensor.setTemperature(temperature);
   alert('Зміни до датчика опалення збережено');
 });
 
 changeTVSettingsButton.addEventListener('click', function() {
   var volume = parseInt(tvVolumeInput.value);
   var resolution = tvResolutionInput.value;
   var channelIndex = parseInt(tvChannelInput.value);
   tvRemote.setVolume(volume);
   tvRemote.setResolution(resolution);
   tvRemote.changeChannel(channelIndex);
   alert('Зміни до пульта телевізора збережено');
 });
 
/********* 
// Елементи для датчиків руху
var motionStateButton = document.getElementById('motion-state-button');

// Елементи для датчиків води
var waterStateButton = document.getElementById('water-state-button');

// Елементи для датчиків газу
var gasStateButton = document.getElementById('gas-state-button');

// Елементи для датчиків світла
var lightStateButton = document.getElementById('light-state-button');
var lightBrightnessInput = document.getElementById('light-brightness-input');
var lightColorInput = document.getElementById('light-color-input');
var changeLightSettingsButton = document.getElementById('change-light-settings-button');

// Елементи для датчиків опалення
var heatingStateButton = document.getElementById('heating-state-button');
var heatingTemperatureInput = document.getElementById('heating-temperature-input');
var changeHeatingSettingsButton = document.getElementById('change-heating-settings-button');

// Елементи для пульта телевізора
var tvStateButton = document.getElementById('tv-state-button');
var tvVolumeInput = document.getElementById('tv-volume-input');
var tvResolutionInput = document.getElementById('tv-resolution-input');
var tvChannelInput = document.getElementById('tv-channel-input');
var changeTVSettingsButton = document.getElementById('change-tv-settings-button');
/********** */