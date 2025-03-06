import { useState } from 'react'
import Page from '../../components/page'

function Home() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(<></>)

  const submit = async (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(str)){
      const response = await fetch('api/emails.js', {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain",
        },
        body: str,
      });
  
      if (!response.ok) {
        throw new Error('Failed to record email');
      }
      const data = await response.json();
      setEmail('')
      setError(<p className="text-lime-400">Success!</p>)
      setTimeout(function(){setError(<></>)}, 5000)
    } else {
      setError(<p className="text-red-600">An error occured - please try again</p>)
      setTimeout(function(){setError(<></>)}, 5000)
    }
  }

  const handleKeyPress = (event) => {
    if (event){
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submit(email);
      }
    }
  };

  return (
    <>
      <Page>
        <div className="flex flex-col sm:flex-row items-center justify-center rounded-xl slide-bg p-[2px]">
          <input onKeyDown = {(e)=>{handleKeyPress(e)}} value={email} onChange = {(e)=>{setEmail(e.target.value)}} className="rounded-t-xl sm:rounded-t-none sm:rounded-l-xl p-4 text-center sm:text-left focus:outline-none bg-black" type="email" placeholder="Enter your email"></input>
          <button onClick={()=>{submit(email)}} className="rounded-r-xl rounded-l-none p-4 focus:outline-white color-black cursor-pointer hover:brightness-100">Join our waitlist</button>
        </div>
        {error}
      </Page>
    </>
  )
}

export default Home