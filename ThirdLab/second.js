
class Engine {
  constructor(type, power, volume) {
    this.type = type;
    this.power = power;
    this.volume = volume;
  }

  static createDiesel(power, volume) {
    return new Engine('diesel', power, volume);
  }

  static createElectric(power) {
    return new Engine('electric', power, null);
  }

  static createGasoline(power, volume) {
    return new Engine('gasoline', power, volume);
  }

  getInfo() {
    if (this.type === 'electric') {
      return `${this.type} engine, power: ${this.power}kW`;
    }
    return `${this.type} engine, power: ${this.power}HP, volume: ${this.volume}L`;
  }

  start() {
    return `${this.type} engine started`;
  }

  stop() {
    return `${this.type} engine stopped`;
  }
}

class Carriage {
  constructor(type, capacity, comfortLevel) {
    this.type = type;
    this.capacity = capacity;
    this.comfortLevel = comfortLevel;
  }

  static createPassenger(capacity, comfortLevel = 'standard') {
    return new Carriage('passenger', capacity, comfortLevel);
  }

  static createCargo(capacity) {
    return new Carriage('cargo', capacity, 'none');
  }

  static createRestaurant() {
    return new Carriage('restaurant', 40, 'high');
  }

  getInfo() {
    return `${this.type} carriage, capacity: ${this.capacity}, comfort: ${this.comfortLevel}`;
  }

  load(passengers) {
    return `Loading ${passengers} into ${this.type} carriage`;
  }

  unload() {
    return `Unloading ${this.type} carriage`;
  }
}

class TransportVehicle {
  constructor(name, engine, maxSpeed, capacity) {
    this.name = name;
    this.engine = engine;
    this.maxSpeed = maxSpeed;
    this.capacity = capacity;
    this.isMoving = false;
  }

  static createAutomobile(name, engine, maxSpeed, capacity) {
    return new TransportVehicle(name, engine, maxSpeed, capacity);
  }

  static createLocomotive(name, engine, maxSpeed) {
    return new TransportVehicle(name, engine, maxSpeed, 0);
  }

  static createExpress(name, engine, maxSpeed, capacity) {
    return new TransportVehicle(name, engine, maxSpeed, capacity);
  }

  getInfo() {
    return `${this.name}, max speed: ${this.maxSpeed}km/h, capacity: ${this.capacity}, engine: ${this.engine.getInfo()}`;
  }

  start() {
    this.isMoving = true;
    return `${this.name} started moving. ${this.engine.start()}`;
  }

  stop() {
    this.isMoving = false;
    return `${this.name} stopped. ${this.engine.stop()}`;
  }

  getStatus() {
    return `${this.name} is ${this.isMoving ? 'moving' : 'stopped'}`;
  }
}

class Train {
  constructor(name, locomotive, carriages = []) {
    this.name = name;
    this.locomotive = locomotive;
    this.carriages = carriages;
    this.isAssembled = false;
  }

  static createExpressTrain(name, locomotive) {
    return new Train(name, locomotive, []);
  }

  static createFreightTrain(name, locomotive) {
    return new Train(name, locomotive, []);
  }

  addCarriage(carriage) {
    this.carriages.push(carriage);
    return `Added ${carriage.getInfo()} to train ${this.name}`;
  }

  removeCarriage(index) {
    if (index >= 0 && index < this.carriages.length) {
      const removed = this.carriages.splice(index, 1)[0];
      return `Removed ${removed.getInfo()} from train ${this.name}`;
    }
    return 'Invalid carriage index';
  }

  assemble() {
    this.isAssembled = true;
    return `Train ${this.name} assembled with ${this.carriages.length} carriages`;
  }

  getInfo() {
    const carriagesInfo = this.carriages.map(carriage => 
      `  - ${carriage.getInfo()}`
    ).join('\n');
    
    return `Train: ${this.name}
Locomotive: ${this.locomotive.getInfo()}
Carriages (${this.carriages.length}):
${carriagesInfo}
Status: ${this.isAssembled ? 'assembled' : 'not assembled'}`;
  }

  calculateTotalCapacity() {
    return this.carriages.reduce((total, carriage) => 
      total + carriage.capacity, 0
    );
  }
}

class TransportSystem {
  constructor() {
    this.vehicles = [];
    this.trains = [];
  }

  static create() {
    return new TransportSystem();
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
    return `Added vehicle: ${vehicle.name}`;
  }

  addTrain(train) {
    this.trains.push(train);
    return `Added train: ${train.name}`;
  }

  startAll() {
    const results = [];
    this.vehicles.forEach(vehicle => {
      results.push(vehicle.start());
    });
    this.trains.forEach(train => {
      if (train.locomotive) {
        results.push(train.locomotive.start());
      }
    });
    return results;
  }

  getSystemInfo() {
    const vehiclesInfo = this.vehicles.map(vehicle => 
      `- ${vehicle.getInfo()}`
    ).join('\n');
    
    const trainsInfo = this.trains.map(train => 
      `- ${train.getInfo()}`
    ).join('\n\n');

    return `Transport System Overview:
    
Vehicles (${this.vehicles.length}):
${vehiclesInfo}

Trains (${this.trains.length}):
${trainsInfo}`;
  }
}

// Демонстрационная программа
console.log('=== TRANSPORT SYSTEM DEMONSTRATION ===\n');

// Создание двигателей
const dieselEngine = Engine.createDiesel(500, 12);
const electricEngine = Engine.createElectric(800);
const gasolineEngine = Engine.createGasoline(200, 3.0);

// Создание транспортных средств
const automobile = TransportVehicle.createAutomobile(
  'Volvo Truck',
  dieselEngine,
  120,
  3
);

const locomotive = TransportVehicle.createLocomotive(
  'Electric Locomotive',
  electricEngine,
  160
);

const express = TransportVehicle.createExpress(
  'High-Speed Express',
  electricEngine,
  300,
  150
);

// Создание вагонов
const passengerCarriage1 = Carriage.createPassenger(80, 'high');
const passengerCarriage2 = Carriage.createPassenger(90, 'standard');
const restaurantCarriage = Carriage.createRestaurant();
const cargoCarriage = Carriage.createCargo(50000);

// Создание поездов
const expressTrain = Train.createExpressTrain('Sapsan', locomotive);
const freightTrain = Train.createFreightTrain('Freight Express', locomotive);

// Добавление вагонов к поездам
console.log(expressTrain.addCarriage(passengerCarriage1));
console.log(expressTrain.addCarriage(passengerCarriage2));
console.log(expressTrain.addCarriage(restaurantCarriage));
console.log(expressTrain.assemble());

console.log(freightTrain.addCarriage(cargoCarriage));
console.log(freightTrain.addCarriage(cargoCarriage));
console.log(freightTrain.assemble());

// Создание транспортной системы
const transportSystem = TransportSystem.create();

// Добавление транспортных средств в систему
console.log(transportSystem.addVehicle(automobile));
console.log(transportSystem.addVehicle(express));
console.log(transportSystem.addTrain(expressTrain));
console.log(transportSystem.addTrain(freightTrain));

// Информация о системе
console.log('\n' + transportSystem.getSystemInfo());

console.log('\n=== OPERATIONS ===\n');

// Запуск транспорта
console.log('Starting all vehicles:');
transportSystem.startAll().forEach(status => {
  console.log(status);
});

console.log('\n=== VEHICLE OPERATIONS ===\n');

// Демонстрация работы отдельных транспортных средств
console.log(automobile.getInfo());
console.log(automobile.start());
console.log(automobile.getStatus());
console.log(automobile.stop());

console.log('\n=== TRAIN OPERATIONS ===\n');

// Демонстрация работы поездов
console.log(expressTrain.getInfo());
console.log(`Total passenger capacity: ${expressTrain.calculateTotalCapacity()}`);

console.log('\n' + freightTrain.getInfo());
console.log(`Total cargo capacity: ${freightTrain.calculateTotalCapacity()}kg`);

console.log('\n=== ENGINE DEMONSTRATION ===\n');

// Демонстрация работы двигателей
console.log(dieselEngine.getInfo());
console.log(electricEngine.getInfo());
console.log(gasolineEngine.getInfo());

console.log('\n=== CARRIAGE OPERATIONS ===\n');

// Демонстрация работы вагонов
console.log(passengerCarriage1.getInfo());
console.log(passengerCarriage1.load(50));
console.log(passengerCarriage1.unload());

console.log('\n' + cargoCarriage.getInfo());
console.log(cargoCarriage.load(25000));

console.log('\n=== DEMONSTRATION COMPLETE ===');