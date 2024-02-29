import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-sky-950 text-white text-base text-center py-4'>
        URL Shortner | DarrshanTG
    </div>
  );
};

export default Footer;
