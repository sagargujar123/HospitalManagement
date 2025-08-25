import { CustomTransformPipe } from './custom-transform.pipe';

describe('CustomTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
