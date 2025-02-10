interface FakeLogin {
  email: string;
  password: string;
}
type FakeLoginFn = (props: FakeLogin) => Promise<FakeLogin>;

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
