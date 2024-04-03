import LoginForm from '../components/login-form';
import LogoImg from '@/assets/logo.jpg';

const Login = () => {
  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center'>
      <div className='grid grid-cols-1 place-content-center gap-10 lg:grid-cols-2 lg:gap-20'>
        <img
          src={LogoImg}
          className='h-72 w-72 place-self-center rounded-full'
          alt='Upi Logo'
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
