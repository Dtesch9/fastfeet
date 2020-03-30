function filterOptions(options) {
  return options.reduce((allOptions, eachOption) => {
    allOptions.push({ value: eachOption.id, label: eachOption.name });

    return allOptions;
  }, []);
}

function filterDefault(defaultOp) {
  return { value: defaultOp.id, label: defaultOp.name };
}

export { filterOptions, filterDefault };
