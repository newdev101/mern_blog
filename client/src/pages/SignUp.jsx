import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function SignUp() {

  const [formData, setFormData] = React.useState({});
  const [erroMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //! haldling errors
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }

    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);

    }
  }
  console.log(formData)

  return (

    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/* left */}
        <div className='flex-1'>
          <Link to="/"
            className='font-bold dark:text-white text-4xl'>

            <span className='px-2 py-1 
          bg-gradient-to-r 
          from-indigo-500 
          via-purple-500 
          to-pink-500 
          rounded-lg text-white'>
              Jana's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can signup with your email and password.
          </p>
        </div>


        {/* right */}
        <div className='flex-1'>


          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            {/* username */}
            <div className="">
              <Label value='username' />
              <TextInput type='text' id='username' placeholder='username' onChange={handleChange} />
            </div>

            {/* email */}
            <div className="">
              <Label value='Email' />
              <TextInput type='email' id='email' placeholder='name@company.com' onChange={handleChange} />
            </div>

            {/* password */}
            <div className="">
              <Label value='Password' />
              <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
            </div>


            {/* button */}
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'signup'
              }
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Signin
            </Link>

          </div>
          {
            erroMessage && (
              <Alert className='mt-5' color='failure'>
                {erroMessage}
              </Alert>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default SignUp