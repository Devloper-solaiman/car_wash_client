import { Chip } from '@nextui-org/react';
import React from 'react';

const Location: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center mt-4">
      <Chip size="lg" variant="bordered" className="text-xl">
        Our Location
      </Chip>
      <div className="w-full h-48 lg:h-96 mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7432123247453!2d90.40053231536342!3d23.810330392615393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89f6f1e16a9%3A0x2fdfdc3759c16f12!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1693912014851!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
