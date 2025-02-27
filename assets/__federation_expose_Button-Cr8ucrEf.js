import { importShared } from './__federation_fn_import-C2xHtRtv.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';

const btn = "_btn_133i7_17";
const style = {
	btn: btn
};

const {useState} = await importShared('react');
const Button = ({ text }) => {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: style.btn, onClick: () => setCount((n) => n + 1), children: `${text} ${count}` });
};

export { Button as default };
