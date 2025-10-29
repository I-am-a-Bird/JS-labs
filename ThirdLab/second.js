// Класс Двигатель - базовый компонент транспортного средства
class Engine {
    #type;  // Приватное поле: тип двигателя (дизельный, бензиновый, электрический)
    #power; // Приватное поле: мощность двигателя в лошадиных силах
    
    // Конструктор класса Engine - создает новый объект двигателя
    constructor(type = "Бензиновый", power = 100) {
        this.#type = type;   // Устанавливаем тип двигателя
        this.#power = power; // Устанавливаем мощность двигателя
    }
    
    // Геттер для получения типа двигателя
    get type() { return this.#type; }
    
    // Геттер для получения мощности двигателя  
    get power() { return this.#power; }
    
    // Метод для строкового представления двигателя
    toString() { return `${this.#type} (${this.#power} л.с.)`; }
}

// Класс Вагон - компонент поезда
class Wagon {
    #type;      // Приватное поле: тип вагона (пассажирский, грузовой, ресторан)
    #capacity;  // Приватное поле: вместимость вагона (количество мест или груза)
    
    // Конструктор класса Wagon - создает новый объект вагона
    constructor(type = "Пассажирский", capacity = 50) {
        this.#type = type;         // Устанавливаем тип вагона
        this.#capacity = capacity; // Устанавливаем вместимость вагона
    }
    
    // Геттер для получения типа вагона
    get type() { return this.#type; }
    
    // Геттер для получения вместимости вагона
    get capacity() { return this.#capacity; }
    
    // Метод для строкового представления вагона
    toString() { return `${this.#type} (${this.#capacity} мест)`; }
}

// Класс Транспортное средство - базовый класс для всех видов транспорта
// КОМПОЗИЦИЯ: Vehicle содержит (состоит из) Engine
class Vehicle {
    #name;      // Приватное поле: название транспортного средства
    #maxSpeed;  // Приватное поле: максимальная скорость
    #engine;    // Приватное поле: объект двигателя (КОМПОЗИЦИЯ)
    
    // Конструктор класса Vehicle - создает новое транспортное средство
    constructor(name, maxSpeed, engine) {
        this.#name = name;           // Устанавливаем название
        this.#maxSpeed = maxSpeed;   // Устанавливаем максимальную скорость
        this.#engine = engine;       // Устанавливаем двигатель (композиция)
    }
    
    // Геттер для получения названия
    get name() { return this.#name; }
    
    // Геттер для получения максимальной скорости
    get maxSpeed() { return this.#maxSpeed; }
    
    // Геттер для получения двигателя
    get engine() { return this.#engine; }
    
    // Метод для строкового представления транспортного средства
    toString() { return `${this.#name} (${this.#maxSpeed} км/ч) с ${this.#engine}`; }
}

// Класс Автомобиль - представляет автомобильный транспорт
// КОМПОЗИЦИЯ: Car содержит (состоит из) Vehicle
class Car {
    #vehicle;       // Приватное поле: объект транспортного средства (КОМПОЗИЦИЯ)
    #bodyType;      // Приватное поле: тип кузова автомобиля
    #doorsCount;    // Приватное поле: количество дверей
    
    // Конструктор класса Car - создает новый автомобиль
    constructor(name, maxSpeed, engine, bodyType, doorsCount) {
        // КОМПОЗИЦИЯ: создаем объект Vehicle внутри Car
        this.#vehicle = new Vehicle(name, maxSpeed, engine);
        this.#bodyType = bodyType;     // Устанавливаем тип кузова
        this.#doorsCount = doorsCount; // Устанавливаем количество дверей
    }
    
    // Геттер для получения вложенного объекта Vehicle
    get vehicle() { return this.#vehicle; }
    
    // Геттер для получения типа кузова
    get bodyType() { return this.#bodyType; }
    
    // Метод для строкового представления автомобиля
    toString() { 
        return `${this.#vehicle}, кузов: ${this.#bodyType}, дверей: ${this.#doorsCount}`; 
    }
}

// Класс Поезд - представляет железнодорожный транспорт
// КОМПОЗИЦИЯ: Train содержит Vehicle и массив Wagons
class Train {
    #vehicle;   // Приватное поле: объект транспортного средства (КОМПОЗИЦИЯ)
    #wagons;    // Приватное поле: массив вагонов (КОМПОЗИЦИЯ)
    #route;     // Приватное поле: маршрут поезда
    
    // Конструктор класса Train - создает новый поезд
    constructor(name, maxSpeed, engine, route) {
        // КОМПОЗИЦИЯ: создаем объект Vehicle внутри Train
        this.#vehicle = new Vehicle(name, maxSpeed, engine);
        this.#wagons = [];        // Инициализируем пустой массив вагонов
        this.#route = route;      // Устанавливаем маршрут
    }
    
    // Геттер для получения вложенного объекта Vehicle
    get vehicle() { return this.#vehicle; }
    
    // Геттер для получения массива вагонов
    get wagons() { return this.#wagons; }
    
    // Геттер для получения маршрута
    get route() { return this.#route; }
    
    // Метод для добавления вагона в поезд
    addWagon(wagon) {
        this.#wagons.push(wagon); // Добавляем вагон в массив
    }
    
    // Метод для расчета общей вместимости всех вагонов поезда
    getTotalCapacity() {
        // Суммируем вместимость всех вагонов в массиве
        return this.#wagons.reduce((total, wagon) => total + wagon.capacity, 0);
    }
    
    // Метод для строкового представления поезда
    toString() {
        return `${this.#vehicle}, маршрут: "${this.#route}", вагонов: ${this.#wagons.length}`;
    }
}

// Класс Экспресс - представляет скоростной поезд
// КОМПОЗИЦИЯ: Express содержит Train
class Express {
    #train;         // Приватное поле: объект поезда (КОМПОЗИЦИЯ)
    #comfortClass;  // Приватное поле: класс комфорта
    #hasWiFi;       // Приватное поле: наличие WiFi
    
    // Конструктор класса Express - создает новый экспресс
    constructor(name, maxSpeed, engine, route, comfortClass, hasWiFi) {
        // КОМПОЗИЦИЯ: создаем объект Train внутри Express
        this.#train = new Train(name, maxSpeed, engine, route);
        this.#comfortClass = comfortClass; // Устанавливаем класс комфорта
        this.#hasWiFi = hasWiFi;           // Устанавливаем наличие WiFi
    }
    
    // Геттер для получения вложенного объекта Train
    get train() { return this.#train; }
    
    // Геттер для получения класса комфорта
    get comfortClass() { return this.#comfortClass; }
    
    // Делегирование метода addWagon объекту Train
    addWagon(wagon) { this.#train.addWagon(wagon); }
    
    // Делегирование метода getTotalCapacity объекту Train
    getTotalCapacity() { return this.#train.getTotalCapacity(); }
    
    // Метод для строкового представления экспресса
    toString() {
        return `${this.#train}, класс: ${this.#comfortClass}, ${this.#hasWiFi ? 'WiFi' : 'без WiFi'}`;
    }
}

// Статический класс-фабрика для создания транспортных объектов
class TransportFactory {
    // Статический метод для создания двигателей разных типов
    static createEngine(type) {
        // Объект с предустановленными типами двигателей
        const engines = {
            diesel: new Engine("Дизельный", 150),
            petrol: new Engine("Бензиновый", 120),
            electric: new Engine("Электрический", 200)
        };
        // Возвращаем соответствующий двигатель или стандартный если тип не найден
        return engines[type] || new Engine();
    }
    
    // Статический метод для создания вагонов разных типов
    static createWagon(type) {
        // Объект с предустановленными типами вагонов
        const wagons = {
            passenger: new Wagon("Пассажирский", 80),
            cargo: new Wagon("Грузовой", 1000),
            restaurant: new Wagon("Ресторан", 40)
        };
        // Возвращаем соответствующий вагон или стандартный если тип не найден
        return wagons[type] || new Wagon();
    }
    
    // Статический метод для создания автомобилей разных типов
    static createCar(type) {
        // Объект с предустановленными конфигурациями автомобилей
        const cars = {
            sedan: new Car("Седан", 200, TransportFactory.createEngine("petrol"), "Седан", 4),
            suv: new Car("Внедорожник", 180, TransportFactory.createEngine("diesel"), "Внедорожник", 5),
            sport: new Car("Спорткар", 300, TransportFactory.createEngine("petrol"), "Купе", 2)
        };
        // Возвращаем соответствующий автомобиль или стандартный если тип не найден
        return cars[type] || new Car("Автомобиль", 180, TransportFactory.createEngine("petrol"), "Седан", 4);
    }
    
    // Статический метод для создания поездов разных типов
    static createTrain(type) {
        // Создаем поезд с параметрами в зависимости от типа
        const train = new Train(
            type === "passenger" ? "Пассажирский поезд" : "Грузовой поезд",
            type === "passenger" ? 140 : 100,
            TransportFactory.createEngine("diesel"),
            type === "passenger" ? "Москва - СПб" : "Грузовой маршрут"
        );
        
        // Определяем какие вагоны добавлять в зависимости от типа поезда
        const wagonTypes = type === "passenger" 
            ? ["passenger", "passenger", "restaurant"]  // Пассажирские вагоны + ресторан
            : ["cargo", "cargo", "cargo"];              // Только грузовые вагоны
            
        // Добавляем вагоны в поезд
        wagonTypes.forEach(wagonType => train.addWagon(TransportFactory.createWagon(wagonType)));
        return train;
    }
    
    // Статический метод для создания экспресс-поезда
    static createExpress() {
        // Создаем экспресс с высокоскоростными параметрами
        const express = new Express(
            "Скоростной экспресс",
            350, // Высокая скорость
            TransportFactory.createEngine("electric"), // Электрический двигатель
            "Москва - Казань", // Маршрут
            "Бизнес", // Высокий класс комфорта
            true      // Есть WiFi
        );
        
        // Добавляем несколько пассажирских вагонов
        for (let i = 0; i < 3; i++) {
            express.addWagon(TransportFactory.createWagon("passenger"));
        }
        
        return express;
    }
}

// Статический класс для управления и анализа транспорта
class TransportManager {
    // Статический метод для поиска самого быстрого транспортного средства
    static findFastest(vehicles) {
        // Используем reduce для поиска максимального значения
        return vehicles.reduce((fastest, current) => {
            // Получаем скорость текущего транспорта (учитываем композицию)
            const currentSpeed = current.vehicle ? current.vehicle.maxSpeed : current.maxSpeed;
            // Получаем скорость текущего самого быстрого транспорта
            const fastestSpeed = fastest.vehicle ? fastest.vehicle.maxSpeed : fastest.maxSpeed;
            // Сравниваем и возвращаем более быстрый транспорт
            return currentSpeed > fastestSpeed ? current : fastest;
        });
    }
    
    // Статический метод для расчета времени пути
    static calculateTravelTime(distance, transport) {
        // Получаем скорость транспорта (учитываем композицию)
        const speed = transport.vehicle ? transport.vehicle.maxSpeed : transport.maxSpeed;
        // Вычисляем время в часах
        const hours = distance / speed;
        // Возвращаем объект с часами и минутами
        return { 
            hours: Math.floor(hours),                    // Целая часть часов
            minutes: Math.round((hours % 1) * 60)       // Оставшиеся минуты
        };
    }
}

// ДЕМОНСТРАЦИЯ РАБОТЫ ВСЕЙ СИСТЕМЫ
console.log("=== ДЕМОНСТРАЦИЯ КОМПОЗИЦИИ В ТРАНСПОРТНОЙ СИСТЕМЕ ===\n");

// Используем фабрику для создания различных транспортных средств
const car = TransportFactory.createCar("sport");        // Создаем спортивный автомобиль
const train = TransportFactory.createTrain("passenger"); // Создаем пассажирский поезд
const express = TransportFactory.createExpress();       // Создаем скоростной экспресс

// Помещаем все созданные транспортные средства в массив
const transports = [car, train, express];

console.log("=== СОЗДАННЫЕ ТРАНСПОРТНЫЕ СРЕДСТВА ===");
// Выводим информацию о каждом транспорте
transports.forEach((transport, i) => {
    console.log(`${i + 1}. ${transport.toString()}`);
});

console.log("\n=== ИНФОРМАЦИЯ О КОМПОЗИЦИИ ===");
// Демонстрируем как работает композиция - объекты содержат другие объекты
console.log("Автомобиль содержит:", car.vehicle.toString());
console.log("Поезд содержит:", train.vehicle.toString(), "+", train.wagons.length, "вагонов");
console.log("Экспресс содержит поезд, который содержит:", express.train.vehicle.toString());

console.log("\n=== САМОЕ БЫСТРОЕ ТРАНСПОРТНОЕ СРЕДСТВО ===");
// Используем TransportManager для поиска самого быстрого транспорта
const fastest = TransportManager.findFastest(transports);
console.log(fastest.toString());

console.log("\n=== ВРЕМЯ ПУТИ (700 км) ===");
// Рассчитываем время пути для каждого транспорта на дистанции 700 км
transports.forEach(transport => {
    const time = TransportManager.calculateTravelTime(700, transport);
    console.log(`${transport.vehicle.name}: ${time.hours}ч ${time.minutes}м`);
});