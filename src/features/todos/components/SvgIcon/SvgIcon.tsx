import { ImgHTMLAttributes } from 'react';
import styles from './SvgIcon.module.scss';

interface SvgIconProps extends ImgHTMLAttributes<HTMLImageElement> {}
export function SvgIcon({ ...props }: SvgIconProps) {
  return <img className={styles.SvgIcon} {...props} />;
}
