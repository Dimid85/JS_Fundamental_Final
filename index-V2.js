// Клас "Розумний будинок"
class SmartHome {
   constructor() {
     this.components = [];
   }
 
   addComponent(component) {
     this.components.push(component);
     component.state = false; // Встановлюємо початковий стан "Вимкнено"
   }
 
   removeComponent(component) {
     const index = this.components.indexOf(component);
     if (index !== -1) {
       this.components.splice(index, 1);
     }
   }
 
   getAllComponentStates() {
    return this.components.map(component => component);
  }
  
  
   toggleComponentState(component) {
     component.toggleState();
   }
 
   
 
 }
 
 // Базовий клас "Компонент розумного будинку"
 class SmartComponent {
   constructor(name) {
     this.name = name;
     this.state = false;
   }
 
   toggleState() {
     this.state = !this.state;
   }
 
   getState() {
     return this.state;
   }
 }
 
 class Component {
   constructor(name) {
     this.name = name;
     this.state = false; // Початковий стан "Вимкнено"
   }
 
   toggleState() {
     this.state = !this.state;
   }
 
   turnOn() {
     this.state = true;
   }
 
   turnOff() {
     this.state = false;
   }
 
   getState() {
     return this.state;
   }
 }
 
 // Клас "Світильник"
class Light extends SmartComponent {
  constructor(name) {
    super(name);
    this.brightness = 0;
    this.color = 'white';
  }

  setBrightness(brightness) {
    this.brightness = Math.min(Math.max(brightness, -100), 100);
  }

  setColor(color) {
    if (['red', 'blue', 'green', 'pink'].includes(color)) {
      this.color = color;
    }
  }

  getState() {
    return {
      ...super.getState(),
      brightness: this.brightness,
      color: this.color,
    };
  }
}

// Клас "Обігрів"
class Heating extends SmartComponent {
  constructor(name) {
    super(name);
    this.temperature = 0;
  }

  setTemperature(temperature) {
    this.temperature = Math.min(Math.max(temperature, 15), 70);
  }

  getState() {
    return {
      ...super.getState(),
      temperature: this.temperature,
    };
  }
}

// Клас "Жалюзі"
class Blinds extends SmartComponent {
  constructor(name) {
    super(name);
    this.openingPercentage = 0;
  }

  setOpenPercentage(openingPercentage) {
    this.openingPercentage = Math.min(Math.max(openingPercentage, 0), 100);
  }

  getState() {
    return {
      ...super.getState(),
      openingPercentage: this.openingPercentage,
    };
  }
}

// Клас "Телевізор"
class Television extends SmartComponent {
  constructor(name) {
    super(name);
    this.power = false;
    this.currentChannelIndex = 0;
    this.channels = [];
    this.volume = 0;
  }

  togglePower() {
    this.power = !this.power;
  }

  setChannels(channels) {
    this.channels = channels;
  }

  changeChannel(index) {
    if (index >= 0 && index < this.channels.length) {
      this.currentChannelIndex = index;
    }
  }

  setVolume(volume) {
    this.volume = Math.min(Math.max(volume, 0), 100);
  }

  getState() {
    return {
      ...super.getState(),
      power: this.power ? 'ON' : 'OFF',
      channel: this.channels[this.currentChannelIndex],
      volume: this.volume,
    };
  }
}

 
 // Клас "Web-інтерфейс"
 class WebInterface {
   constructor(smartHome) {
     this.smartHome = smartHome;
     this.registerForm = document.getElementById('register-form');
     this.loginForm = document.getElementById('login-form');
     this.addLightForm = document.getElementById('add-light-form');
     this.addHeatingForm = document.getElementById('add-heating-form');
     this.addBlindsForm = document.getElementById('add-blinds-form');
     this.addTelevisionForm = document.getElementById('add-television-form');
     this.componentStatusButton = document.getElementById('component-status-button');
 
     this.currentUser = null;
     this.loadUser();
 
     this.registerForm.addEventListener('submit', (event) => {
       event.preventDefault();
       const usernameInput = document.getElementById('register-username');
       const passwordInput = document.getElementById('register-password');
       const username = usernameInput.value;
       const password = passwordInput.value;
 
       if (this.validateCredentials(username, password)) {
         this.currentUser = {
           username,
           password,
         };
 
         this.saveUser();
         usernameInput.value = '';
         passwordInput.value = '';
 
         // Створюємо об'єкт з ключем-значенням
         const user = {
           "Username": username,
           "Password": password
         };
 
         // Відображаємо дані в модальному вікні
         const modalContent = document.createElement('div');
         modalContent.innerHTML = '<h2>User Data</h2>';
 
         for (const key in user) {
           const para = document.createElement('p');
           para.textContent = `${key}: ${user[key]}`;
           modalContent.appendChild(para);
         }
 
         this.openModal(modalContent);
 
         console.log('Registered:', this.currentUser);
       } else {
         console.log('Invalid credentials');
       }
     });
 
     this.modal = document.querySelector('.modal');
     this.modalContent = document.querySelector('.modal-content');
     this.closeModalButton = document.getElementById('close-modal-button');
 
     this.registerForm.addEventListener('submit', (event) => this.handleRegister(event));
     this.loginForm.addEventListener('submit', (event) => this.handleLogin(event));
     this.addLightForm.addEventListener('submit', (event) => this.handleAddLight(event));
     this.addHeatingForm.addEventListener('submit', (event) => this.handleAddHeating(event));
     this.addBlindsForm.addEventListener('submit', (event) => this.handleAddBlinds(event));
     this.addTelevisionForm.addEventListener('submit', (event) => this.handleAddTelevision(event));
     this.componentStatusButton.addEventListener('click', (event) => this.handleComponentStatus(event));
     this.closeModalButton.addEventListener('click', () => this.closeModal());
   }
 
   loadUser() {
     const savedUser = localStorage.getItem('user');
     if (savedUser) {
       this.currentUser = JSON.parse(savedUser);
     }
   }
 
   saveUser() {
     localStorage.setItem('user', JSON.stringify(this.currentUser));
   }
 
   handleRegister(event) {
     event.preventDefault();
     const usernameInput = document.getElementById('register-username');
     const passwordInput = document.getElementById('register-password');
     const username = usernameInput.value;
     const password = passwordInput.value;
 
     if (this.validateCredentials(username, password)) {
       this.currentUser = {
         username,
         password,
       };
 
       this.saveUser();
       usernameInput.value = '';
       passwordInput.value = '';
 
       console.log('Registered:', this.currentUser);
     } else {
       console.log('Invalid credentials');
     }
   }
 
   handleLogin(event) {
     event.preventDefault();
     const usernameInput = document.getElementById('login-username');
     const passwordInput = document.getElementById('login-password');
     const username = usernameInput.value;
     const password = passwordInput.value;
 
     if (
       this.currentUser &&
       this.currentUser.username === username &&
       this.currentUser.password === password
     ) {
       console.log('Logged in:', this.currentUser);
     } else {
       console.log('Login failed');
     }
 
     usernameInput.value = '';
     passwordInput.value = '';
   }
 
   openModal(content) {
     this.modal.style.display = 'block';
     this.modalContent.innerHTML = '';
     this.modalContent.appendChild(content);
   }
 
   closeModal() {
     this.modal.style.display = 'none';
     this.modalContent.innerHTML = '';
   }
 
   handleAddLight(event) {
     event.preventDefault();
     const lightNameInput = document.getElementById('light-name');
     const lightBrightnessInput = document.getElementById('light-brightness');
     const lightColorInput = document.getElementById('light-color');
     const lightName = lightNameInput.value;
     const lightBrightness = parseInt(lightBrightnessInput.value);
     const lightColor = lightColorInput.value;
 
     const light = new Light(lightName);
     light.setBrightness(lightBrightness);
     light.setColor(lightColor);
 
     this.smartHome.addComponent(light);
 
     lightNameInput.value = '';
     lightBrightnessInput.value = '';
     lightColorInput.value = '';
 
     console.log('Added light:', light);
   }
 
   handleAddHeating(event) {
     event.preventDefault();
     const heatingNameInput = document.getElementById('heating-name');
     const heatingTemperatureInput = document.getElementById('heating-temperature');
     const heatingName = heatingNameInput.value;
     const heatingTemperature = parseInt(heatingTemperatureInput.value);
 
     const heating = new Heating(heatingName);
     heating.setTemperature(heatingTemperature);
 
     this.smartHome.addComponent(heating);
 
     heatingNameInput.value = '';
     heatingTemperatureInput.value = '';
 
     console.log('Added heating:', heating);
   }
 
   handleAddBlinds(event) {
     event.preventDefault();
     const blindsNameInput = document.getElementById('blinds-name');
     const blindsOpeningInput = document.getElementById('blinds-opening');
     const blindsName = blindsNameInput.value;
     const blindsOpening = parseInt(blindsOpeningInput.value);
 
     const blinds = new Blinds(blindsName);
     blinds.setOpenPercentage(blindsOpening);
 
     this.smartHome.addComponent(blinds);
 
     blindsNameInput.value = '';
     blindsOpeningInput.value = '';
 
     console.log('Added blinds:', blinds);
   }
 
   handleAddTelevision(event) {
     event.preventDefault();
     const televisionNameInput = document.getElementById('television-name');
     const televisionChannelsInput = document.getElementById('television-channels');
     const televisionVolumeInput = document.getElementById('television-volume');
     const televisionName = televisionNameInput.value;
     const televisionChannels = televisionChannelsInput.value.split(',');
     const televisionVolume = parseInt(televisionVolumeInput.value);
 
     const television = new Television(televisionName);
     television.setChannels(televisionChannels);
     television.setVolume(televisionVolume);
 
     this.smartHome.addComponent(television);
 
     televisionNameInput.value = '';
     televisionChannelsInput.value = '';
     televisionVolumeInput.value = '';
 
     console.log('Added television:', television);
   }
 
   handleComponentStatus() {
    const componentStates = this.smartHome.getAllComponentStates();
    const userData = this.getUserData();
  
    const modalContent = document.createElement('div');
    modalContent.innerHTML = `
      <h2>Component States</h2>
      <pre>${this.formatComponentStates(componentStates)}</pre>
      <h2>User Data</h2>
      <pre>${this.formatObject(userData)}</pre>
    `;
  
    this.openModal(modalContent);
  }
  
  formatComponentStates(componentStates) {
    if (componentStates) {
      let result = '';
      for (const component of componentStates) {
        let state;
        if (component.userState !== undefined) {
          state = component.userState ? 'On' : 'Off';
        } else {
          state = 'Off';
        }
  
        let info = `Name: ${component.name}, State: ${state}`;
  
        // Отримання додаткових властивостей для кожного типу компонента
        if (component instanceof Light) {
          info += `, Brightness: ${component.brightness}, Color: ${component.color}`;
        } else if (component instanceof Heating) {
          info += `, Temperature: ${component.temperature}`;
        } else if (component instanceof Blinds) {
          info += `, Opening Percentage: ${component.openingPercentage}`;
        } else if (component instanceof Television) {
          info += `, Power: ${component.power ? 'ON' : 'OFF'}, Channel: ${component.channels[component.currentChannelIndex]}, Volume: ${component.volume}`;
        }
  
        result += info + '\n';
      }
      return result;
    } else {
      return 'No data available';
    }
  }
  

  
  formatObject(obj) {
    if (obj) {
      let result = '';
      for (const key in obj) {
        result += `${key}: ${obj[key]}\n`;
      }
      return result;
    } else {
      return 'No data available';
    }
  }
  
  
  
  
  
  
  
  
 
   getUserData() {
     if (this.currentUser) {
       return {
         username: this.currentUser.username,
         password: this.currentUser.password,
       };
     } else {
       return null;
     }
   }
 
   validateCredentials(username, password) {
     return username.trim() !== '' && password.trim() !== '';
   }
 }
 
 // Створення об'єкту "Розумний будинок"
 const smartHome = new SmartHome();
 
 // Створення об'єкту "Web-інтерфейс"
const webInterface = new WebInterface(smartHome);

// Виведення стану компонентів
webInterface.handleComponentStatus();
