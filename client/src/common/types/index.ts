export interface LocationState {
  to: {
    pathname: string;
  };
}

export type WithChildren<T = {}> = T & { children?: React.ReactNode };
