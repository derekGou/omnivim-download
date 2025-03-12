import { useState, useEffect } from 'react'
import Page from '../../components/page';

const getOS = () => {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS") || userAgent.includes("iPhone")) return "iOS";
  return "Unknown OS";
};

function Download() {
  const [os, setOS] = useState("");

  useEffect(() => {
    setOS(getOS());
  }, []);

  const newDownload = async() => {
    const response = await fetch('api/download.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to increment visits');
    }
  }

  return (
    <>
      <Page>
        {os!="Windows" ? 
          <>
            <p>Our test version is only available on Windows. Sign up for our email list to be notified when the full version is out.</p>
            <button onClick={()=>{setOS("Windows")}} className="cursor-pointer py-4 px-8 rounded-xl slide-bg">Continue anyway</button>
          </>
          :
          <>
            <p>Download our Windows-only test version, unzip the folder, and run the executable.</p>
            <div className="flex flex-row items-center justify-center gap-4">
              <a onClick={()=>{newDownload()}} href="/Omnivim.zip" download={true}>
                <button className="cursor-pointer py-4 px-8 rounded-xl slide-bg">Download ZIP</button>
              </a>
              <a onClick={()=>{newDownload()}} href="/D.7z" download={true}>
                <button className="cursor-pointer py-4 px-8 rounded-xl slide-bg">Download 7ZIP</button>
              </a>
            </div>
          </>
        }
      </Page>
    </>
  )
}

export default Download