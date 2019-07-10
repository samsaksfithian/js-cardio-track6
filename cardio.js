// 🏃🏼🏊🏼🏋🏼🏄🏼

/**
 * Filters people array based on total number of letters in their name (including spaces).
 * Filter if name is strictly greater than length
 *
 * @param {string[]} people
 * @param {number} length
 * @returns {string[]} filtered array
 */
function filterByLength(people, length) {
  return people.filter(person => person.length > length);
}

/**
 * Returns an array of every nth person.
 * Note that counting starts at 0,
 * so the returned array will always include (at least) the first person.
 *
 * @param  {string[]} people
 * @param  {number} n
 * @returns {string[]}
 *
 * @example
 *    everyNPerson(['Matt', 'Kim', 'Kanye', 'Obama', 'Hans'], 2)
 *    // → ['Matt', 'Kanye', 'Hans']
 */
function everyNPerson(people, n) {
  return people.filter((person, index) => index % n === 0 || n === 0);
}

/**
 * Returns an array where each entry is the person's intials
 * @param {string[]} people
 * @returns {string[]} intials array
 *
 * @example
 *    initials(['Kanye West', 'Barack Obama'])
 *    // → ['KW', 'BO']
 */
function initials(people) {
  return people.map(person => {
    const [first, last] = person.split(' ');
    return `${first[0]}${last[0]}`;
    // using reduce for longer name initials
    // return person.split(' ').reduce((acc, curr) => `${acc}${curr[0]}`, '');
  });
}

/**
 * Returns an array where every person is prepended with their position in the array
 * @param {string[]} people
 * @returns {string[]}
 *
 * @example
 *    peopleWithPosition(['Kanye', 'Barack'])
 *    // → ['0: Kanye', '1: Barack']
 */
function peopleWithPosition(people) {
  return people.map((person, index) => `${index}: ${person}`);
}

/**
 * Sorts `people` by first name
 * @param {string[]} people
 * @returns {string[]} sorted array
 */
function sortByFirstName(people) {
  return [...people].sort();
  // return [...people].sort((left, right) => {
  //   const leftFirst = left.split(' ')[0];
  //   const rightFirst = right.split(' ')[0];
  //   return leftFirst < rightFirst ? -1 : 1;
  // });
}

/**
 * Sorts `people` by last name
 * @param {string[]} people
 * @returns {string[]} sorted array
 */
function sortByLastName(people) {
  return [...people].sort((left, right) => {
    const leftLast = left.split(' ')[1];
    const rightLast = right.split(' ')[1];
    return leftLast < rightLast ? -1 : 1;
  });
}

/**
 * Counts all the characters in the people array (including spaces)
 * @param {Array} people Array of names
 * @return Number of characters
 */
function countTotalCharacters(people) {
  return people.reduce((acc, person) => acc + person.length, 0);
}

/**
 * Returns `true` if everyone in `people` has `letter` in their name.
 * Returns `false` otherwise
 * @param {string[]} people
 * @param {string} letter
 * @returns {boolean}
 */
function everyoneHasLetter(people, letter) {
  // const pplWLetter = people.filter(person => person.includes(letter));
  // return pplWLetter.length === people.length;
  return people.every(person => person.includes(letter));
}

/**
 * Returns `true` if at least one person has `letter` in their name.
 * Returns `false` otherwise
 * @param {string[]} people
 * @param {string} letter
 * @returns {boolean}
 */
function someoneHasLetter(people, letter) {
  // const pplWLetter = people.filter(person => person.includes(letter));
  // return pplWLetter.length > 0;
  return people.some(person => person.includes(letter));
}

module.exports = {
  filterByLength,
  everyNPerson,
  initials,
  sortByFirstName,
  sortByLastName,
  countTotalCharacters,
  everyoneHasLetter,
  someoneHasLetter,
  peopleWithPosition,
};
