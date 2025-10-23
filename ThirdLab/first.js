class Circle {
    static #circleCount = 0;
    
    #x;
    #y;
    #radius;

    constructor(x = 0, y = 0, radius = 1) {
        this.#x = x;
        this.#y = y;
        this.radius = radius; 
        Circle.#circleCount++;
    }

  
    static getClassInfo() {
        return `Circle class. Created ${Circle.#circleCount} objects`;
    }

 
    static createFromDiameter(x, y, diameter) {
        return new Circle(x, y, diameter / 2);
    }

 
    static createUnitCircle(x, y) {
        return new Circle(x, y, 1);
    }

  
    get x() {
        return this.#x;
    }

    set x(value) {
        if (typeof value !== 'number') {
            throw new Error('X coordinate must be a number');
        }
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        if (typeof value !== 'number') {
            throw new Error('Y coordinate must be a number');
        }
        this.#y = value;
    }

    get radius() {
        return this.#radius;
    }

    set radius(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Radius must be a positive number');
        }
        this.#radius = value;
    }

    get center() {
        return { x: this.#x, y: this.#y };
    }

    set center(point) {
        if (typeof point.x !== 'number' || typeof point.y !== 'number') {
            throw new Error('Center coordinates must be numbers');
        }
        this.#x = point.x;
        this.#y = point.y;
    }


    getArea() {
        return Math.PI * this.#radius * this.#radius;
    }

    getCircumference() {
        return 2 * Math.PI * this.#radius;
    }

    isOnLine(k, b) {
        return Math.abs(this.#y - (k * this.#x + b)) < 0.0001;
    }

    getInfo() {
        return `Circle: center(${this.#x}, ${this.#y}), radius: ${this.#radius}, area: ${this.getArea().toFixed(2)}, circumference: ${this.getCircumference().toFixed(2)}`;
    }

    equals(otherCircle) {
        return this.#x === otherCircle.x && 
               this.#y === otherCircle.y && 
               this.#radius === otherCircle.radius;
    }

    distanceTo(otherCircle) {
        const dx = this.#x - otherCircle.x;
        const dy = this.#y - otherCircle.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

console.log('=== CIRCLE CLASS DEMONSTRATION ===\n');


console.log('1. Creating circles:');
const circle1 = new Circle(0, 0, 5);
console.log(circle1.getInfo());

const circle2 = new Circle(2, 3, 3);
console.log(circle2.getInfo());

const circle3 = new Circle(4, 6, 7);
console.log(circle3.getInfo());


const circle4 = Circle.createFromDiameter(1, 1, 10);
console.log(circle4.getInfo());

const circle5 = Circle.createUnitCircle(5, 5);
console.log(circle5.getInfo());

console.log('\n' + Circle.getClassInfo());


console.log('\n2. Working with properties and methods:');


console.log('\nChanging properties:');
circle1.x = 10;
circle1.radius = 8;
console.log('After changes: ' + circle1.getInfo());

try {
    circle1.radius = -5;
} catch (error) {
    console.log('Error caught: ' + error.message);
}

try {
    circle1.x = 'invalid';
} catch (error) {
    console.log('Error caught: ' + error.message);
}


console.log('\nComparison:');
console.log(`circle1 equals circle2: ${circle1.equals(circle2)}`);
console.log(`Distance between circle1 and circle2: ${circle1.distanceTo(circle2).toFixed(2)}`);


console.log('\nType checking:');
console.log(`circle1 is instance of Circle: ${circle1 instanceof Circle}`);
console.log(`circle1 type: ${circle1.constructor.name}`);


console.log('\n3. Working with array of circles:');


const circles = [
    new Circle(0, 0, 5),
    new Circle(2, 4, 3),
    new Circle(4, 8, 2),
    new Circle(1, 2, 7),
    new Circle(3, 6, 4),
    new Circle(6, 12, 6),
    new Circle(0, 0, 1),
    new Circle(5, 10, 8)
];

console.log(`Created ${circles.length} circles:`);
circles.forEach((circle, index) => {
    console.log(`${index + 1}. ${circle.getInfo()}`);
});


console.log('\na) Circles with centers on the same line:');

function findCirclesOnSameLine(circlesArray) {
    const lines = new Map();
    
   
    for (let i = 0; i < circlesArray.length; i++) {
        for (let j = i + 1; j < circlesArray.length; j++) {
            const circle1 = circlesArray[i];
            const circle2 = circlesArray[j];
            

            const k = (circle2.y - circle1.y) / (circle2.x - circle1.x);
            const b = circle1.y - k * circle1.x;
            
            const lineKey = `y = ${k.toFixed(2)}x + ${b.toFixed(2)}`;
            
            if (!lines.has(lineKey)) {
                lines.set(lineKey, [circle1, circle2]);
            } else {
                if (!lines.get(lineKey).includes(circle1)) {
                    lines.get(lineKey).push(circle1);
                }
                if (!lines.get(lineKey).includes(circle2)) {
                    lines.get(lineKey).push(circle2);
                }
            }
        }
    }
    

    const result = [];
    for (const [line, circlesOnLine] of lines) {
 
        const allCirclesOnLine = circlesArray.filter(circle => {
            return circle.isOnLine(
                parseFloat(line.split(' ')[2]), // k
                parseFloat(line.split(' ')[5])  // b
            );
        });
        
        if (allCirclesOnLine.length >= 3) {
            result.push({
                line: line,
                circles: allCirclesOnLine
            });
        }
    }
    
    return result;
}

const circlesOnLines = findCirclesOnSameLine(circles);
if (circlesOnLines.length > 0) {
    circlesOnLines.forEach((group, index) => {
        console.log(`\nLine ${index + 1}: ${group.line}`);
        group.circles.forEach(circle => {
            console.log(`  - ${circle.getInfo()}`);
        });
    });
} else {
    console.log('No lines with 3 or more circles found');
}


console.log('\nb) Largest and smallest circles:');


const sortedByArea = [...circles].sort((a, b) => a.getArea() - b.getArea());
console.log('\nBy area:');
console.log(`Smallest: ${sortedByArea[0].getInfo()}`);
console.log(`Largest: ${sortedByArea[sortedByArea.length - 1].getInfo()}`);

const sortedByCircumference = [...circles].sort((a, b) => a.getCircumference() - b.getCircumference());
console.log('\nBy circumference:');
console.log(`Smallest: ${sortedByCircumference[0].getInfo()}`);
console.log(`Largest: ${sortedByCircumference[sortedByCircumference.length - 1].getInfo()}`);

console.log('\nAdditional statistics:');
const totalArea = circles.reduce((sum, circle) => sum + circle.getArea(), 0);
const avgArea = totalArea / circles.length;
console.log(`Total area of all circles: ${totalArea.toFixed(2)}`);
console.log(`Average area: ${avgArea.toFixed(2)}`);

console.log('\n=== DEMONSTRATION COMPLETE ===');