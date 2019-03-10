const compose = (...functions) => (component) => (
  functions.reduceRight(
    (prevResult, fn) => fn(prevResult),
    component
  )
);

export default compose;
