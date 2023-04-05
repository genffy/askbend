// Copyright 2022 Datafuse Labs.
import { FC, ReactElement } from 'react';
import styles from './styles.module.less';
import clsx from 'clsx';
interface IProps {
  className?: string;
}
const WhiteLoading: FC<IProps> = ({className}): ReactElement=> {
  return (
    <svg className={clsx(styles.loading, className)} width="16" height="16" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-icon="spin"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="linearGradient-1"><stop stopColor="#fff" stopOpacity="0" offset="0%"></stop><stop stopColor="#fff" stopOpacity="0.50" offset="39.9430698%"></stop><stop stopColor="#fff" offset="100%"></stop></linearGradient></defs><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fillOpacity="0.01" fill="none" x="0" y="0" width="36" height="36"></rect><path d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951" stroke="url(#linearGradient-1)" strokeWidth="4" strokeLinecap="round"></path></g></svg>
  );
};
export default WhiteLoading;