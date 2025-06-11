import React, { useEffect, useState } from 'react';
import ModalPopup from './card2';
import { PhoneCallIcon, Mail, SquarePlay, SquareChartGantt, VideoIcon } from 'lucide-react';

export default function Footer() {
  const [content, setContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/footer')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading footer content:', err));
  }, []);

  const openModal = (key: string, value: string) => {
    setCurrentKey(key);
    setInputValue(value);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!content) return;

    const newContent = JSON.parse(JSON.stringify(content));

    if (currentKey === 'contact.email') {
      newContent.contact.email = inputValue;
    } else if (currentKey === 'contact.phone') {
      newContent.contact.phone = inputValue;
    } else if (currentKey === 'newsletter.title') {
      newContent.newsletter.title = inputValue;
    } else if (currentKey === 'newsletter.description') {
      newContent.newsletter.description = inputValue;
    } else if (currentKey === 'copyright') {
      newContent.copyright = inputValue;
    } else if (currentKey === 'links.customerCare.0.text') {
      newContent.links.customerCare[0].text = inputValue;
    } else if (currentKey === 'links.customerCare.1.text') {
      newContent.links.customerCare[1].text = inputValue;
    } else if (currentKey === 'links.ourCompany.0.text') {
      newContent.links.ourCompany[0].text = inputValue;
    } else if (currentKey === 'links.helpInfo.0.text') {
      newContent.links.helpInfo[0].text = inputValue;
    }

    fetch('http://localhost:3002/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent)
    })
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsModalOpen(false);
      })
      .catch(err => console.error('Error saving:', err));
  };

  if (!content) return <div>Loading footer...</div>;

  return (
    <div>
      <ModalPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <h2 className="text-lg font-bold mb-2">Edit Content</h2>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full border p-2 rounded text-black"
        />
      </ModalPopup>

      <div className="hidden sm:flex justify-center">
        <img src={content.logo.src} alt={content.logo.alt} className="max-w-full h-auto" />
      </div>

      <div className="bg-gray-200 text-gray-600 px-4 py-12">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-8 sm:gap-14">

          {/* Contact Section */}
          <div className="space-y-4 min-w-[150px]">
            <p className="flex items-center gap-2 cursor-pointer"
              onClick={() => openModal('contact.email', content.contact.email)}>
              <Mail size={16} /> {content.contact.email}
            </p>
            <p className="flex items-center gap-2 cursor-pointer"
              onClick={() => openModal('contact.phone', content.contact.phone)}>
              <PhoneCallIcon size={16} /> {content.contact.phone}
            </p>
            <div className="flex gap-3">
              <SquareChartGantt size={18} />
              <SquarePlay size={18} />
              <VideoIcon size={18} />
            </div>
          </div>

          {/* Customer Care */}
          <div className="min-w-[150px]">
            <h1 className="text-base sm:text-lg font-semibold mb-2">Customer Care</h1>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="cursor-pointer"
                onClick={() => openModal('links.customerCare.0.text', content.links.customerCare[0].text)}>
                {content.links.customerCare[0].text}
              </li>
              <li className="cursor-pointer"
                onClick={() => openModal('links.customerCare.1.text', content.links.customerCare[1].text)}>
                {content.links.customerCare[1].text}
              </li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="min-w-[150px]">
            <h1 className="text-base sm:text-lg font-semibold mb-2">Our Company</h1>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="cursor-pointer"
                onClick={() => openModal('links.ourCompany.0.text', content.links.ourCompany[0].text)}>
                {content.links.ourCompany[0].text}
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div className="min-w-[150px]">
            <h1 className="text-base sm:text-lg font-semibold mb-2">Help & Info</h1>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="cursor-pointer"
                onClick={() => openModal('links.helpInfo.0.text', content.links.helpInfo[0].text)}>
                {content.links.helpInfo[0].text}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full sm:w-60 mt-4 sm:mt-0">
            <h1 className="text-base sm:text-lg font-bold mb-2 cursor-pointer"
              onClick={() => openModal('newsletter.title', content.newsletter.title)}>
              {content.newsletter.title}
            </h1>
            <p className="mb-4 text-sm sm:text-base cursor-pointer"
              onClick={() => openModal('newsletter.description', content.newsletter.description)}>
              {content.newsletter.description}
            </p>
            <input
              type="email"
              placeholder={content.newsletter.placeholder}
              className="p-2 sm:p-3 text-black rounded-lg w-full text-sm sm:text-base"
            />
            <button className="bg-black text-white px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base mt-2">
              Subscribe
            </button>

            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              <img src={content.socialIcons[0].src} alt={content.socialIcons[0].alt} className="w-8 h-8 sm:w-10 sm:h-10" />
              <img src={content.socialIcons[1].src} alt={content.socialIcons[1].alt} className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 py-2">
        <p
          className="text-gray-600 text-xs sm:text-sm cursor-pointer"
          onClick={() => openModal('copyright', content.copyright)}
        >
          {content.copyright}
        </p>
      </div>
    </div>
  );
}
