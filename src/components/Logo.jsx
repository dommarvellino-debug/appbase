import { Image } from '@/components/ui/image';

export const LOGO_URL = 'https://media.base44.com/images/public/6a58e12da7d5fa72fa8e2b0e/377517fee_Gemini_Generated_Image_pze503pze503pze51.jpg';

export default function Logo({ className = 'h-10 w-10' }) {
  return <Image src={LOGO_URL} alt="Mowise logo" className={`overflow-hidden rounded-2xl bg-white ${className}`} fittingType="fill" />;
}