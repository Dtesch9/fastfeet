const hasObject = object => Object.entries(object).length;
const isProblem = object => Object.entries(object).length === 1;

export { hasObject, isProblem };
