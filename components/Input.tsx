import { Input, InputProps } from "@rneui/themed";

export const TextInput = (props: InputProps) => {
  return <Input {...props} />;
};
export const NumericInput = (props: InputProps) => {
  return <Input keyboardType="numeric" selectTextOnFocus {...props} />;
};
