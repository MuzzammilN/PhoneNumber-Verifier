import React, { useState } from 'react'
function App() {

  
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async (number, apiKey) => {
    const url = `https://apilayer.net/api/validate?access_key=${apiKey}&number=${number}&country_code=&format=1`

    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } 

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  const apiKey = "";

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await fetchData(PhoneNumber, apiKey);
    setData(data);
    console.log("Success");
    setPhoneNumber("");
  } catch (error) {
    console.log(error);
  }
};



  return (
    <>
      <div className="bg-black w-screen h-screen flex flex-col justify-center items-center">
        <h1 className='text-white font-bold text-4xl text-shadow-[0_0px_45px_rgba(255,255,0,0.7)]'>Phone Number <span className='text-amber-400'>Verifier</span></h1>
        <h3 className='text-gray-500 text-md wrap-anywhere w-lg text-center mt-5'>This tool identifies and verifies a number, providing details such as its validity, geographic location, and service provider.<br/> (Only Intended For Legal Use)</h3>
        <form className='max-w-md mx-auto px-4 mt-8 flex flex-col justify-center' onSubmit={handleSubmit}>
          <div className='mb-5 flex flex-row space-x-4'>
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number: </label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} value={PhoneNumber}
            type='tel' id='number' placeholder='14161231234' className='bg-gray-5000 border placeholder:text-gray-600 border-gray-300 text-white text-sm rounded-md px-2' ></input>     
          </div>
            <button className='rounded-lg px-3 py-1 bg-yellow-500 text-white font-bold mx-auto mt-5'>Submit</button>
        </form>

        {data && (
                  <div className="mt-6 text-white p-4 rounded-lg shadow-lg w-[350px] text-center">
                    <h2 className="text-xl font-bold mb-3">Phone Number Information</h2>

                    <p ><span className="font-bold">Valid:</span> {data.valid ? <span className='text-green-400'>Yes</span> : <span className='text-red-400'>No</span>}</p>
                    <p className='font-light'><span className="font-bold">Number:</span> {data.international_format}</p>
                    <p className='font-light'><span className="font-bold">Location:</span> {data.location}</p>
                    <p className='font-light'><span className="font-bold">Country:</span> {data.country_name}</p>
                    <p className='font-light'><span className="font-bold">Carrier:</span> {data.carrier}</p>
                    <p className='font-light'><span className="font-bold">Line Type:</span> {data.line_type}</p>
                  </div>
                )}

      </div>
    </>
  )
}

export default App
