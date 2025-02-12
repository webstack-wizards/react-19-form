export interface FakeLogin {
  email: string;
  password: string;
}

export type ResultRequest = Promise<FakeLogin | { message: string }>;

type FakeLoginFn = (props: FakeLogin) => ResultRequest;

export const fakeLogin: FakeLoginFn = ({ email, password }) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (email && password) {
        resolve({ email, password });
      } else {
        reject({ message: 'Invalid email or password' });
      }
    }, 1000),
  );
};
