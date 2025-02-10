import { useState } from 'react';
import { fakeLogin } from './serverRequests';

type HandleInput = (value: React.ChangeEvent<HTMLInputElement>) => void;

interface InputBox {
  title?: string;
  type: string;
  value?: string;
  onChange: HandleInput;
  required?: boolean;
}

const InputBox = ({ title, type, value, onChange, required = false }: InputBox) => {
  switch (type) {
    case 'password':
      return (
        <label className="inputBox">
          {title && <span className={'inputBox__title' + (value ? ' active' : '')}>{title}</span>}
          <input type={type} value={value} onChange={onChange} minLength={8} required={required} />
        </label>
      );
    default:
      return (
        <label className="inputBox">
          {title && <span className={'inputBox__title' + (value ? ' active' : '')}>{title}</span>}
          <input type={type} value={value} onChange={onChange} required={required} />
        </label>
      );
  }
};

const OldForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('writing');

  const handleInput = (setter: (value: string) => void): HandleInput => {
    return (e) => {
      setter(e.target.value);
    };
  };

  const handleEmail = handleInput(setEmail);
  const handlesetPassword = handleInput(setPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus('pending');
    try {
      const result = await fakeLogin({ email, password });
      setStatus('success');
      console.log(result);
    } catch (error) {
      setStatus('error');
      console.log(error);
    }
  };

  return (
    <section className="sectionForm">
      {!(status === 'success') ? (
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="formTitle">Login</h2>
          <InputBox onChange={handleEmail} type="email" title="Email" value={email} />
          <InputBox
            onChange={handlesetPassword}
            type="password"
            title="Password"
            value={password}
            required
          />
          {status === 'error' && <p>Wrong password or login</p>}
          <button className="buttonSubmit" disabled={status === 'pending'}>
            {status === 'pending' ? 'Pending...' : 'Submit'}
          </button>
        </form>
      ) : (
        <h2 className="formTitle">success login</h2>
      )}
    </section>
  );
};

export default OldForm;
