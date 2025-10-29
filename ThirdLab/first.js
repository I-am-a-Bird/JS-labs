class Circle {
    #x; #y; #radius;
    constructor(x = 0, y = 0, radius = 1) {
        this.#x = x;
        this.#y = y;
        this.radius = radius;
    }
    get x() { return this.#x; }
    get y() { return this.#y; }
    get radius() { return this.#radius; }
    get area() { return Math.PI * this.#radius * this.#radius; }
    get perimeter() { return 2 * Math.PI * this.#radius; }
    set x(value) {
        if (typeof value !== 'number') throw new Error('X должен быть числом');
        this.#x = value;
    }
    set y(value) {
        if (typeof value !== 'number') throw new Error('Y должен быть числом');
        this.#y = value;
    }
    set radius(value) {
        if (typeof value !== 'number' || value <= 0) throw new Error('Радиус должен быть > 0');
        this.#radius = value;
    }
    toString() {
        return `Окружность(центр: (${this.#x}, ${this.#y}), радиус: ${this.#radius})`;
    }
    static areOnSameLine(circles) {
        if (circles.length < 2) return true;
        const [first, second] = circles;
        const allXSame = circles.every(c => c.x === first.x);
        if (allXSame) return true;
        const allYSame = circles.every(c => c.y === first.y);
        if (allYSame) return true;
        const slope = (second.y - first.y) / (second.x - first.x);
        return circles.every(circle => {
            const expectedY = first.y + slope * (circle.x - first.x);
            return Math.abs(circle.y - expectedY) < 1e-10;
        });
    }
    static groupByLines(circles) {
        const groups = [];
        const processed = new Set();
        for (let i = 0; i < circles.length; i++) {
            if (processed.has(i)) continue;
            const group = [circles[i]];
            processed.add(i);
            for (let j = i + 1; j < circles.length; j++) {
                if (processed.has(j)) continue;
                if (this.areOnSameLine([...group, circles[j]])) {
                    group.push(circles[j]);
                    processed.add(j);
                }
            }
            groups.push(group);
        }
        return groups;
    }
    static findMinMax(circles) {
        if (circles.length === 0) return null;
        let minArea = circles[0], maxArea = circles[0];
        let minPerimeter = circles[0], maxPerimeter = circles[0];
        for (const circle of circles) {
            if (circle.area < minArea.area) minArea = circle;
            if (circle.area > maxArea.area) maxArea = circle;
            if (circle.perimeter < minPerimeter.perimeter) minPerimeter = circle;
            if (circle.perimeter > maxPerimeter.perimeter) maxPerimeter = circle;
        }
        return { minArea, maxArea, minPerimeter, maxPerimeter };
    }
}

const circles = [
    new Circle(0, 0, 5),
    new Circle(0, 3, 2),
    new Circle(0, -2, 4),
    new Circle(2, 2, 3),
    new Circle(4, 4, 1),
    new Circle(1, 0, 6),
    new Circle(3, 0, 2),
    new Circle(10, 5, 2)
];

console.log("=== ВСЕ ОКРУЖНОСТИ ===");
circles.forEach((c, i) => {
    console.log(`${i + 1}. ${c.toString()}`);
    console.log(`   Площадь: ${c.area.toFixed(2)}, Длина: ${c.perimeter.toFixed(2)}`);
});

console.log("\n=== ГРУППЫ ПО ПРЯМЫМ ===");
const groups = Circle.groupByLines(circles);
groups.forEach((group, i) => {
    console.log(`Группа ${i + 1}:`);
    group.forEach(c => console.log(`  - ${c.toString()}`));
});

console.log("\n=== МИН/МАКС ===");
const minMax = Circle.findMinMax(circles);
console.log(`Наименьшая по площади: ${minMax.minArea.toString()} (${minMax.minArea.area.toFixed(2)})`);
console.log(`Наибольшая по площади: ${minMax.maxArea.toString()} (${minMax.maxArea.area.toFixed(2)})`);
console.log(`Наименьшая по периметру: ${minMax.minPerimeter.toString()} (${minMax.minPerimeter.perimeter.toFixed(2)})`);
console.log(`Наибольшая по периметру: ${minMax.maxPerimeter.toString()} (${minMax.maxPerimeter.perimeter.toFixed(2)})`);