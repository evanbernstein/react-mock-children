import {render, screen} from '@testing-library/react';
import {Greeting} from './__fixtures__/Greeting';

vi.mock('./__fixtures__/Greeting');

/**
 * Documents Vitest behaviors that react-mock-children relies on when a component is
 * automocked with vi.mock(path) and no factory.
 */
describe('Vitest automock of a React component', () => {
  /** Documents that an automocked component is recognized as a mock function. */
  it('is a mock function', () => {
    expect(vi.isMockFunction(Greeting)).toBe(true);
  });

  /** Documents that the automocked function keeps its original name, and records that its mock name is the generic vi.fn(), not the component name. */
  it('keeps its original function name', () => {
    expect(Greeting.name).toBe('Greeting');
    expect(vi.mocked(Greeting).getMockName()).toBe('vi.fn()');
  });

  /** Documents that a mockImplementation renders through React and records the props received. */
  it('renders a stub implementation and records props', () => {
    vi.mocked(Greeting).mockImplementation((props) => (
      <div data-testid="stub">{props.children}</div>
    ));

    render(<Greeting name="Ada">child</Greeting>);

    expect(screen.getByTestId('stub').textContent).toBe('child');
    expect(vi.mocked(Greeting).mock.lastCall?.[0]).toMatchObject({name: 'Ada'});
  });

  describe('with clearMocks enabled in config', () => {
    beforeEach(() => {
      vi.mocked(Greeting).mockImplementation(() => <div data-testid="persisted" />);
    });

    /** Documents the first test of a pair that checks beforeEach implementations survive clearMocks. */
    it('has the beforeEach implementation (first test)', () => {
      render(<Greeting name="A" />);
      expect(screen.getByTestId('persisted')).toBeTruthy();
    });

    /** Documents that the beforeEach implementation is still in effect in a later test. */
    it('has the beforeEach implementation (second test)', () => {
      render(<Greeting name="B" />);
      expect(screen.getByTestId('persisted')).toBeTruthy();
    });
  });
});
