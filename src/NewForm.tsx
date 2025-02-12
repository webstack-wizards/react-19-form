import { useActionState } from 'react';
import { fakeLogin } from './serverRequests';
import { useFormStatus } from 'react-dom';

interface InputBox {
  title?: string;
  name: string;
  type: string;
  required?: boolean;
}

type BaseProps = Pick<InputBox, 'name' | 'type' | 'required'> & {
  placeholder: string;
  minLength?: number;
};

const InputBox = ({ title, type, required = false, name }: InputBox) => {
  const baseProps: BaseProps = {
    type,
    required,
    name,
    placeholder: ' ',
  };

  if (type === 'password') {
    baseProps.minLength = 8;
  }

  return (
    <label className="inputBox">
      <input {...baseProps} />
      {title && <span className={'inputBox__title'}>{title}</span>}
    </label>
  );
};

const ButtonSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button className="buttonSubmit" disabled={pending}>
      {pending ? 'Pending...' : 'Submit'}
    </button>
  );
};

type StatusFrom = {
  status: 'writing' | 'error' | 'success';
  message?: string;
};

const NewForm = () => {
  async function submitForm(prevState: StatusFrom, formData: FormData): Promise<StatusFrom> {
    try {
      const email = formData.get('emailUser');
      const password = formData.get('passUser');
      if (!(typeof email === 'string' && typeof password === 'string')) {
        return { status: 'error', message: 'Error with format of email or password' };
      }

      await fakeLogin({
        email,
        password,
      });

      return { ...prevState, status: 'success' };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 'error', message: error.message };
      }
      return { status: 'error', message: 'Unknown error' };
    }
  }

  const [state, formAction] = useActionState(submitForm, {
    status: 'writing',
  });

  if (state.status === 'success') {
    return (
      <section className="sectionForm">
        <h2 className="formTitle">success login</h2>
      </section>
    );
  }
  return (
    <section className="sectionForm">
      <form className="form" action={formAction}>
        <h2 className="formTitle">Login</h2>
        <InputBox type="email" title="Email" name="emailUser" />
        <InputBox type="password" title="Password" name="passUser" required />
        {state.status === 'error' && <p>Wrong password or login</p>}
        <ButtonSubmit />
      </form>
    </section>
  );
};

export default NewForm;
