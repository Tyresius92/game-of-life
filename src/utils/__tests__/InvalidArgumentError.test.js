import InvalidArgumentError from '../InvalidArgumentError';

describe('InvalidArgumentError', () => {
  it('exists', () => {
    expect(new InvalidArgumentError()).toBeTruthy();
  });

  it('it has an error message if constructed with an error', () => {
    const mockErrorThrowingFunction = () => {
      throw new InvalidArgumentError('This is my custom error message');
    };

    expect(() => mockErrorThrowingFunction()).toThrow(
      new InvalidArgumentError('This is my custom error message')
    );
  });
});
