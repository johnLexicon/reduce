/*
The reduce function sends the first value of the array as accumulator if no second argument is given.
*/

const persons = [
  { id: 1, name: 'Kalle Anka', age: 30 },
  { id: 2, name: 'Joakim von Anka', age: 80 },
  { id: 3, name: 'Knatte Anka', age: 18 },
];

let result;

// Count
result = persons.reduce((accumulator, current) => accumulator + 1, 0);
console.log(result);

// Age total sum
result = persons.reduce((accumulator, current) => accumulator + current.age, 0);
console.log(result);

// Array of names (map functionality)
result = persons.reduce(
  (accumulator, current) => [...accumulator, current.name],
  []
);
console.log(result);

// Convert to id => person lookup (dict)

result = persons.reduce(
  (accumulator, current) => ({ ...accumulator, [current.id]: current }),
  {}
);
console.log(result);
console.log(result['2'].name);

// Find Max age

result = persons.reduce(
  (accumulator, current) =>
    accumulator === null || current.age > accumulator
      ? current.age
      : accumulator,
  null
);
console.log(result);

// Find Min age

result = persons.reduce(
  (accumulator, current) =>
    accumulator === null || current.age < accumulator
      ? current.age
      : accumulator,
  null
);
console.log(result);

// All over 18

result = persons.reduce((accumulator, current) => {
  if (!accumulator) return false;
  return current.age >= 18;
}, true);
console.log(result);

// If Any over 80

result = persons.reduce((accumulator, current) => {
  if (accumulator) return true;
  return current.age >= 80;
}, false);
console.log(result);

// Count occurrences

const orders = [
  { id: 1, status: 'pending' },
  { id: 2, status: 'shipped' },
  { id: 3, status: 'shipped' },
  { id: 4, status: 'cancelled' },
  { id: 5, status: 'pending' },
];

result = orders.reduce((accumulator, current) => {
  return {
    ...accumulator,
    [current.status]: (accumulator[current.status] || 0) + 1,
  };
}, {});
console.log(result);

// Flatten

const folders = [
  'reduce.js',
  ['index.html', 'style.css'],
  ['images', ['img.png', 'img.jpg']],
];

const flatten = (acc, curr) => {
  if (Array.isArray(curr)) return [...acc, ...curr.reduce(flatten, [])];
  return [...acc, curr];
};

result = folders.reduce(flatten, []);
console.log(result);

//Remove  duplicate items in an array
const singleItems = [1, 1, 2, 2, 3, 3, 3, 4, 5, 6].reduce((acc, curr) => {
  // If current value doesn't already exists in the accumulator
  if (acc.indexOf(curr) === -1) {
    acc.push(curr);
  }
  return acc;
}, []);

console.log(singleItems);

/*--------- Custom implementations of reduce function -------------*/

function reduce(arr, callback, initial) {
  let accumulator = initial;
  for (let current of arr) {
    accumulator = callback(accumulator, current);
  }
  return accumulator;
}

//Total sum
result = reduce([1, 2, 3], (acc, curr) => acc + curr, 0);
console.log(result);

// Filter positive values and multiply value by 2 (Filter and Map functionality)
result = reduce(
  [2, -1, 5, 8, -10],
  (acc, curr) => {
    if (curr < 0) {
      return acc;
    }
    return [...acc, curr * 2];
  },
  []
);
console.log(result);

// Get names in an array
result = reduce(persons, (acc, curr) => [...acc, curr.name], []);
console.log(result);

// Get max age
result = reduce(
  persons,
  (acc, curr) => (acc === null || acc < curr.age ? curr.age : acc),
  null
);
console.log(result);
