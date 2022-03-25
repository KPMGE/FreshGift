export class MissingParameterError extends Error {
  constructor(parameterName: string) {
    super(`Missing parameter: ${parameterName}`);
    this.name = "MissingParameterError";
  }
}
