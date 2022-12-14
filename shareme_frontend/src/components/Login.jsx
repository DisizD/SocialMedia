import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logowhite.png';
import shareVideo from '../assets/share.mp4';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  
  const responseGoogle = (response) =>{

    const decoded= jwt_decode(response.credential);// console.log(decoded);

    localStorage.setItem('user', JSON.stringify(decoded));// console.log(JSON.stringify(response.profileObj));

    const { name, picture, sub } = decoded;
    
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }// console.log(doc);

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/',{replace: true})
      });
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          control="false"
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt='logo' />
          </div>
          <div className='shadow-2xl'>
              <GoogleLogin  
                render={(renderProps) =>(
                  <button 
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  >
                    <FcGoogle className='mr-4'/>Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onError={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login