// Error to throw for known scenarios
class UnexpectedError extends Error {
  statusCode = 500;
  title:string = 'UnexpectedError'
  constructor(message: string) {
    super(message);
    this.message = message || 'Some error occured';
  }
}

export default UnexpectedError;
