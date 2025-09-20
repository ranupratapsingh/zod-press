// Error to throw for known scenarios
class ExpectedError extends Error {
  statusCode:number = 422;
  title:string = 'ExpectedError';
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default ExpectedError;
