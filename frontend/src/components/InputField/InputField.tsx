const InputField = ({ name }: any) => {

  return (
    <div>
      <input
        type='text'
        required
        name={name}
      />

      <span>Campo obrigatório</span>
    </div>
  );
};

export default InputField;