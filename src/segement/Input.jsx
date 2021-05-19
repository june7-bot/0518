import { useState, useEffect } from 'react';

function InputBox(props) {
  const [input, setInput] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setInput(value);
  }

  useEffect(() => {
    props.change({ name: props.name, value: input });
  }, [input]);

  return (
    <input
      onChange={handleChange}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
export default InputBox;
