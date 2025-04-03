// Define the array of strings
// Define the array of mathematical formulas as strings
let formulas = [];
const Signs = ['<span class="bold">+</span>', '<span class="bold">-</span>', "•", '<span class="bold">:</span>'];
const Squared = '<span class="bold">²</span>';
let current_level = 0;
const undivisible = [];
for (let i = 2; i < 10; i++) {
    for (let j = i + 1; j < 10; j++) {
        if (j % i) {
            undivisible.push([i, j]);
        }
    }
}

// Get references to the DOM elements
const downLevelBtn = document.getElementById("DownLevel");
const upLevelBtn = document.getElementById("UpLevel");
const newBtn = document.getElementById("New");
const title_text = document.getElementById("title");
const formulaContainer = document.getElementById("formulaContainer");

/**
 * Formats a formula string to display fractions properly using HTML spans.
 * @param {string} formulaString - The formula string to format.
 * @returns {string} - The HTML formatted string.
 */
function formatFormulaWithFractions(formulaString) {
    // Regex to find patterns like number/number, variable/number, number/variable, variable/variable
    // Allows alphanumeric characters and '^' for exponents in numerator/denominator
    // It captures the numerator (group 1) and the denominator (group 2)
    const fractionRegex = /(\b[\w\^]+)\s*\/\s*([\w\^]+\b)/g;

    return formulaString.replace(
        fractionRegex,
        '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>'
    );
}

/**
 * Displays all formulas in the container, replacing existing content.
 */
function displayFormulas() {
    // Clear any existing content in the container
    formulaContainer.innerHTML = "";

    // Loop through each formula in the array
    formulas.forEach((formula, index) => {
        // Format the formula string to handle fractions
        // const formattedHtml = formatFormulaWithFractions(formula);

        // Create a new div element for this formula line
        const formulaElement = document.createElement("div");
        formulaElement.className = "formula-line"; // Add class for styling

        // Set the inner HTML of the new element to the formatted formula
        // Using innerHTML because formatFormulaWithFractions returns HTML string
        formulaElement.innerHTML = `${index + 1}|  ` + formula;

        // Append the new element to the formula container
        formulaContainer.appendChild(formulaElement);
    });
}

// Add event listener to the display button
downLevelBtn.addEventListener("click", downLevel);

// Optional: Add a listener or functionality for the other button if needed
upLevelBtn.addEventListener("click", upLevel);
newBtn.addEventListener("click", showExcercise);

function downLevel() {
    if (current_level > 0) {
        current_level -= 1;
    }
    showExcercise();
}

function upLevel() {
    if (current_level < Level.length - 1) {
        current_level += 1;
    }
    showExcercise();
}

function showExcercise() {
    title_text.innerHTML = `Level ${current_level + 1}`;
    formulas = [];
    Level[current_level]();
    displayFormulas();
}
function getRandomFraction(low_num, high_num, low_den, high_den) {
    const fraction = new Fraction(getRandomInt(low_num, high_num), getRandomInt(low_den, high_den));
    return fraction.toHtmlString();
}

function getRandomFractionX(low_num, high_num, low_den, high_den) {
    const fraction = new Fraction(getRandomInt(low_num, high_num), getRandomInt(low_den, high_den));
    let denominator = fraction.denominator;
    if (fraction.denominator == -1) {
        denominator = "-";
    } else if (fraction.denominator == 1) {
        denominator = "";
    }
    return `<span class="fraction"><span class="numerator">${fraction.numerator}</span><span class="denominator">${denominator}x</span></span>`;
}

function getRandomXFraction(low_num, high_num, low_den, high_den) {
    const fraction = new Fraction(getRandomInt(low_num, high_num), getRandomInt(low_den, high_den));
    let numerator = fraction.numerator;
    if (fraction.numerator == -1) {
        numerator = "-";
    } else if (fraction.numerator == 1) {
        numerator = "";
    }
    return `<span class="fraction"><span class="numerator">${numerator}x</span><span class="denominator">${fraction.denominator}</span></span>`;
}

function randomNumberWithX(low_num, high_num) {
    return `${getRandomInt(low_num, high_num)}x`;
}

const Level = [
    () => {
        for (const sign of Signs) {
            formulas.push(
                `${getRandomInt(1, 50)} ${sign} ${getRandomInt(1, 50)}`,
                `${getRandomInt(-1, -50)} ${sign} ${getRandomInt(1, 50)}`,
                `${getRandomInt(1, 50)} ${sign} ${getRandomInt(-1, -50)}`,
                `${getRandomInt(-1, -50)} ${sign} ${getRandomInt(-1, -50)}`,

                `${getRandomInt(1, 50)} ${sign} ${getRandomInt(1, 50)}`,
                `${getRandomInt(-1, -50)} ${sign} ${getRandomInt(1, 50)}`,
                `${getRandomInt(1, 50)} ${sign} ${getRandomInt(-1, -50)}`,
                `${getRandomInt(-1, -50)} ${sign} ${getRandomInt(-1, -50)}`
            );
        }
    },
    () => {
        for (const sign of Signs) {
            formulas.push(
                `${getRandomFraction(1, 50, 2, 10)} ${sign} ${getRandomFraction(1, 50, 2, 10)}`,
                `${getRandomFraction(-50, -1, 2, 10)} ${sign} ${getRandomFraction(1, 50, 2, 10)}`,
                `${getRandomFraction(1, 50, 2, 10)} ${sign} ${getRandomFraction(1, 50, -10, -2)}`,
                `${getRandomFraction(1, 50, -10, -2)} ${sign} ${getRandomFraction(-50, -1, 2, 10)}`
            );
        }
    },
    () => {
        formulas.push(
            `${getRandomInt(2, 20)}x = ${getRandomInt(2, 100)}`,
            `${getRandomInt(-2, -20)}x = ${getRandomInt(2, 100)}`,
            `${getRandomInt(-2, -20)}x = ${getRandomInt(-2, -100)}`,

            `${getRandomInt(2, 100)}x = ${getRandomInt(2, 100)}`,
            `${getRandomInt(2, 100)}x = ${getRandomInt(-2, -100)}`,
            `${getRandomInt(-2, -20)}x = ${getRandomInt(-2, -100)}`,

            `${getRandomInt(2, 20)} = ${getRandomInt(2, 100)}x`,
            `${getRandomInt(2, 20)} = ${getRandomInt(-2, -100)}x`,
            `${getRandomInt(-2, -100)} = ${getRandomInt(-2, -20)}x`,

            `${getRandomInt(2, 100)} = ${getRandomInt(2, 100)}x`,
            `${getRandomInt(-2, -100)} = ${getRandomInt(2, 100)}x`,
            `${getRandomInt(-2, -100)} = ${getRandomInt(-2, -20)}x`
        );
    },
    () => {
        for (const sign of Signs) {
            formulas.push(
                `${getRandomXFraction(1, 20, 1, 20)} ${sign} ${getRandomFraction(1, 20, 1, 20)} = ${getRandomFraction(
                    1,
                    50,
                    2,
                    10
                )}`,
                `${getRandomFraction(1, 20, 1, 20)} ${sign} ${getRandomXFraction(1, 20, 1, 20)} = ${getRandomFraction(
                    1,
                    50,
                    2,
                    10
                )}`,
                `${getRandomFractionX(1, 20, 1, 20)} ${sign} ${getRandomFraction(1, 20, 1, 20)} = ${getRandomFraction(
                    1,
                    50,
                    2,
                    10
                )}`,
                `${getRandomFraction(1, 20, 1, 20)} ${sign} ${getRandomFractionX(1, 20, 1, 20)} = ${getRandomFraction(
                    1,
                    50,
                    2,
                    10
                )}`
            );
        }
    },
    () => {
        for (const sign of Signs) {
            formulas.push(
                `${getRandomXFraction(-20, -1, 1, 20)} ${sign} ${getRandomFraction(
                    -1,
                    -20,
                    1,
                    20
                )} = ${getRandomFraction(1, 50, 2, 10)}`,
                `${getRandomFraction(-20, -1, 1, 20)} ${sign} ${getRandomXFraction(
                    1,
                    20,
                    -1,
                    -20
                )} = ${getRandomFraction(1, 50, 2, 10)}`,
                `${getRandomFractionX(1, 20, -1, -20)} ${sign} ${getRandomFraction(
                    -1,
                    -20,
                    1,
                    20
                )} = ${getRandomFraction(1, 50, 2, 10)}`,
                `${getRandomFraction(1, 20, -1, -20)} ${sign} ${getRandomFractionX(
                    -1,
                    -20,
                    1,
                    20
                )} = ${getRandomFraction(1, 50, 2, 10)}`
            );
        }
    },
    () => {
        [2, 3, 4, 5, 6, 7, 8, 9].shuffle().forEach((i) => {
            formulas.push(`x${Squared} = ${i ** 2}`);
        });
    },
    () => {
        for (const sign of Signs) {
            const pair = undivisible
                .getRandom()
                .shuffle()
                .map((x) => x ** 2);
            const x = new Fraction(pair[0], pair[1]);
            const y = new Fraction(getRandomInt(2, 20), getRandomInt(2, 20));
            const z = SignOperator[sign](x, y);
            formulas.push(`x${Squared} ${sign} ${y.toHtmlString()} = ${z.toHtmlString()}`);
        }
        for (const sign of Signs) {
            const pair = undivisible
                .getRandom()
                .shuffle()
                .map((x) => x ** 2);
            const x = new Fraction(pair[0], pair[1]);
            const y = new Fraction(getRandomInt(2, 20), getRandomInt(2, 20));
            const z = SignOperator[sign](x, y);
            formulas.push(`${z.toHtmlString()} = x${Squared} ${sign} ${y.toHtmlString()}`);
        }
        for (const sign of Signs) {
            const pair = undivisible
                .getRandom()
                .shuffle()
                .map((x) => x ** 2);
            const x = new Fraction(pair[0], pair[1]);
            const y = new Fraction(getRandomInt(2, 20), getRandomInt(2, 20));
            const z = SignOperator[sign](y, x);
            formulas.push(`${y.toHtmlString()} ${sign} x${Squared} = ${z.toHtmlString()}`);
        }
        for (const sign of Signs) {
            const pair = undivisible
                .getRandom()
                .shuffle()
                .map((x) => x ** 2);
            const x = new Fraction(pair[0], pair[1]);
            const y = new Fraction(getRandomInt(2, 20), getRandomInt(2, 20));
            const z = SignOperator[sign](y, x);
            formulas.push(`${z.toHtmlString()} = ${y.toHtmlString()} ${sign} x${Squared}`);
        }
    },
];

function getRandomInt(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
/**
 * Calculates the Greatest Common Divisor (GCD) of two integers using the Euclidean Algorithm.
 * Handles negative inputs by taking their absolute values.
 * @param {number} a - The first integer.
 * @param {number} b - The second integer.
 * @returns {number} The greatest common divisor of a and b.
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Represents a fraction and provides methods for arithmetic operations.
 * Fractions are always stored in their simplest form with a positive denominator.
 */
class Fraction {
    /**
     * Creates a new Fraction instance.
     * @param {number} numerator - The numerator of the fraction.
     * @param {number} [denominator=1] - The denominator of the fraction (defaults to 1).
     */
    constructor(numerator, denominator = 1) {
        // --- Input Validation ---
        if (
            typeof numerator !== "number" ||
            typeof denominator !== "number" ||
            !Number.isInteger(numerator) ||
            !Number.isInteger(denominator)
        ) {
            throw new Error("Numerator and denominator must be integers");
        }
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }

        // --- Simplification and Standardization ---
        if (numerator === 0) {
            this.numerator = 0;
            this.denominator = 1;
        } else {
            const commonDivisor = gcd(numerator, denominator);
            let simplifiedNumerator = numerator / commonDivisor;
            let simplifiedDenominator = denominator / commonDivisor;

            // Ensure denominator is positive
            // if (simplifiedDenominator < 0) {
            //     simplifiedNumerator = -simplifiedNumerator;
            //     simplifiedDenominator = -simplifiedDenominator;
            // }
            this.numerator = simplifiedNumerator;
            this.denominator = simplifiedDenominator;
        }
    }

    toHtmlString() {
        return `<span class="fraction"><span class="numerator">${this.numerator}</span><span class="denominator">${this.denominator}</span></span>`;
    }

    /**
     * Adds another fraction to this fraction.
     * @param {Fraction|number} other - The fraction or number to add.
     * @returns {Fraction} A new Fraction representing the sum.
     */
    /**
     * Checks if this fraction is equal to another fraction.
     * @param {Fraction|number} other - The fraction or number to compare with.
     * @returns {boolean} True if the fractions are equal, false otherwise.
     */
    equals(other) {
        const otherFraction = other instanceof Fraction ? other : new Fraction(other);
        // Since fractions are always simplified in the constructor,
        // we can directly compare numerator and denominator.
        return this.numerator === otherFraction.numerator && this.denominator === otherFraction.denominator;
    }

    /**
     * Returns a string representation of the fraction (e.g., "3/4" or "5").
     * @returns {string} The string representation.
     */
    toString() {
        if (this.denominator === 1) {
            return `${this.numerator}`;
        }
        return `${this.numerator}/${this.denominator}`;
    }

    /**
     * Returns the decimal value of the fraction.
     * @returns {number} The decimal value.
     */
    toNumber() {
        return this.numerator / this.denominator;
    }
}

const SignOperator = {};
SignOperator[Signs[0]] = (lhs, rhs) => {
    const otherFraction = rhs instanceof Fraction ? rhs : new Fraction(rhs);
    const newNumerator = lhs.numerator * otherFraction.denominator + otherFraction.numerator * lhs.denominator;
    const newDenominator = lhs.denominator * otherFraction.denominator;
    return new Fraction(newNumerator, newDenominator);
};
SignOperator[Signs[1]] = (lhs, rhs) => {
    const otherFraction = rhs instanceof Fraction ? rhs : new Fraction(rhs);
    const newNumerator = lhs.numerator * otherFraction.denominator - otherFraction.numerator * lhs.denominator;
    const newDenominator = lhs.denominator * otherFraction.denominator;
    return new Fraction(newNumerator, newDenominator);
};
SignOperator[Signs[2]] = (lhs, rhs) => {
    const otherFraction = rhs instanceof Fraction ? rhs : new Fraction(rhs);
    const newNumerator = lhs.numerator * otherFraction.numerator;
    const newDenominator = lhs.denominator * otherFraction.denominator;
    return new Fraction(newNumerator, newDenominator);
};
SignOperator[Signs[3]] = (lhs, rhs) => {
    const otherFraction = rhs instanceof Fraction ? rhs : new Fraction(rhs);
    if (otherFraction.numerator === 0) {
        throw new Error("Cannot divide by zero fraction.");
    }
    const newNumerator = lhs.numerator * otherFraction.denominator;
    const newDenominator = lhs.denominator * otherFraction.numerator;
    return new Fraction(newNumerator, newDenominator);
};

Array.prototype.getRandom = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [this[i], this[j]] = [this[j], this[i]]; // Swap elements
    }
    return this; // Return shuffled array
};

showExcercise();
