import { Input } from '@nextui-org/react';

export const InputForm = ({
  tipo,
  name,
  label,
  placeholder,
  value,
  onChange,
  messajeError,
  isInvalid,
  estilos,
}) => {
  return (
    <Input
      name={name}
      required
      isInvalid={isInvalid}
      placeholder={placeholder}
      type={tipo}
      label={label}
      variant='bordered'
      value={value}
      errorMessage={messajeError}
      className={estilos}
      onChange={onChange}
    />
  );
};
