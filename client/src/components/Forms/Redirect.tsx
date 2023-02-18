import React from 'react';
import { Link } from 'react-router-dom';

interface RedirectProps {
    desc: string;
    link: string;
}

const Redirect: React.FC<RedirectProps> = ({ desc, link }) => {
  return (
    <div className="Redirect flex">
      <p>
        You're not <span>{desc.toLowerCase()}</span> yet?
      </p>
    <Link className="ml-2 no-underline text-emerald-400" to={link}>{desc}</Link>
    </div>
  );
};

export default Redirect;
