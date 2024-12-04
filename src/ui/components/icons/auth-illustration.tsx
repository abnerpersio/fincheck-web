import { ComponentProps } from 'react';
import authIllustration from '../../../assets/images/auth-illustration.svg';

export default function AuthIllustration(props: ComponentProps<'img'>) {
  return <img src={authIllustration} {...props} />;
}
