import { FC, useState } from 'react';
import { TButtonProps } from './types';

import style from './button.module.css'

const Button: FC<TButtonProps> = ({ text }) => {
  const [count, setCount] = useState(0);

  return (
    <button className={style.btn} onClick={() => setCount((n) => n + 1)}>
      {`${text} ${count}`}
    </button>
  );
};

export default Button;
