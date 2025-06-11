import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import React from 'react'

export default function Contactus() {

  return (
    <div>
        
        <Navbar ></Navbar>
        
      

     <div>
        <div className='flex p-8 flex-col justify-center sm:flex-row sm:justify-between pt-40  '>
        <div className=' w-full sm:w-1/3 flex flex-col gap- text-[#4B4A4A]] text-[18px] font-sans  '>

            <p className='mb-4 text-black text-sm font-semibold'>Drp us a line</p>

            <h2 className='mb-4 text-[#4B4A4A] text-[16px]'> Your Name(required)</h2>
            <input type="name" className='border border-gray-400 w-full mb-4 py-2' />

            <h2 className='mb-4 text-[#4B4A4A] text-[16px]'>Your Email(Required)</h2>
            <input type="name" className='border border-gray-400 w-full mb-4 py-2' />

            
            <h2 className='mb-4 text-[#4B4A4A] text-[16px]'>Your Phone number</h2>
          <input type="name" className='border border-gray-400 w-full mb-4 py-2' />

            
            <h2 className='mb-4 text-[#4B4A4A] text-[16px]'> Your Message</h2>
           <textarea
  className="w-full p-2 border border-gray-400 h-60 mb-3"
  
  placeholder="Enter your message"
></textarea>

<div>
 <button className= '  px-8 py-2 rounded-4xl    border-2 bg-white text-black hover:bg-black hover:text-white text-sm'>Send</button>
</div>

        </div>
        <div className=''>

        <section className="p-4  text-[#4b4a4a] font-sans pr-12">
  
  <div className="">
    <h2 className="text-[#4b4a4a] mb-8 text-xl">Telephone</h2>
    <p className="mb-2 text-base">Saya Helpline: +92 21 38227292</p>
    <p className='mb-20'>WhatsApp:   +92 300 7887292</p>
  </div>

 
  <div className="">
    <h2 className="text-gray-500 mb-6 text-xl">Time</h2>
    <p className="mb-2 text-base">Mon - Fri: 9:00 AM to 6:00 PM</p>
    <p className='mb-16'>Saturday: 9:00 AM to 4:00 PM</p>
  </div>

  
  <div>
    <h2 className=" mb-6 text-xl]">Email</h2>
    <span className="">
     <h2 className='mb-2 text-base'> FOR WHOLESALE INQUIRY</h2>
     <h2 className='mb-14 text-base'> Email: "mailto:Wholesale@saya.pk"</h2>
    </span>
    <p>
      FOR ORDER QUERIES
      
    </p>
    <p>Anayanex@info.pk</p>
  </div>
</section>






        </div>
     </div>


    </div>
  
    </div>
    
  )
}
