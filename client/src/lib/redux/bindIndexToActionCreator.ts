interface ITransformed {
  [key:string]: {};
}

const transformObjectValues = (obj: any, fn: (a: any) => any) => {
  const transformed: ITransformed = {};
  Object.keys(obj).forEach(key => {
    transformed[key] = fn(obj[key]);
  });
  return transformed;
}

const bindActionCreator = (actionCreator: (...args: any[]) => any, index: number) =>
  (...args: any[]) => Object.assign(actionCreator(...args), { index });

const bindActionCreatorMap = (creators: any[], index: number) =>
  transformObjectValues(creators, (actionCreator: (...args: any[]) => any) => bindActionCreator(actionCreator, index));

const bindIndexToActionCreators = (actionCreators: any, index: number) => {
  return typeof actionCreators === 'function'
    ? bindActionCreator(actionCreators, index)
    : bindActionCreatorMap(actionCreators, index);
}

export default bindIndexToActionCreators;
