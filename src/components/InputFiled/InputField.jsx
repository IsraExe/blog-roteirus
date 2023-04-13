import { useState } from 'react';

const InputField = ({ name }) => {
  const [text, setText] = useState();

  return (
    <div>
      <input
        type="text"
        required
        onChange={(e) => setText(e.target.value)}
        name={name}
      />

      <span>Campo obrigatório</span>
    </div>
  );
}

export default InputField;