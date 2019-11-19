const conditional = (
  condition: string,
  trueCase: any,
  falseCase: any
) => (props: any) => {
  return props[condition] ? trueCase : falseCase;
};

export default conditional;
