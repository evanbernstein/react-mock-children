import type {ReactNode} from 'react';

export function Greeting({name, children}: {name: string; children?: ReactNode}) {
  return (
    <section>
      <h1>Hello, {name}</h1>
      {children}
    </section>
  );
}
