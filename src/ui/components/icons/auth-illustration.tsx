import React from 'react';
import authIllustration from '../../../assets/images/auth-illustration.svg';

export default function AuthIllustration(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={authIllustration} {...props} />;
}
