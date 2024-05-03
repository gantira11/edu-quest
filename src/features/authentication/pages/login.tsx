import LoginForm from '../components/login-form';
import LogoImg from '@/assets/logo.jpg';
import LogoSMK from '@/assets/logo-smk8.png';

const Login = () => {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-[url('@/assets/bg-login.jpg')] lg:container">
      <div className='mx-4 grid w-full grid-cols-1 place-content-center gap-10 rounded-lg bg-white/90 p-4 py-10 shadow-lg drop-shadow-lg backdrop-blur-sm lg:w-max lg:grid-cols-2 lg:gap-20 lg:p-10'>
        <div className='flex items-center justify-center gap-2'>
          <img
            src={LogoImg}
            className='h-28 w-28 place-self-center rounded-full lg:h-40 lg:w-40'
            alt='Upi Logo'
          />
          <img
            src={LogoSMK}
            className='h-28 w-28 place-self-center lg:h-40 lg:w-40'
            alt='SMK 8 Logo'
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
