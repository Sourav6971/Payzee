function Input({ value, onChange, placeholder, type, classProps }) {
  return (
    <input
      className={`${classProps} py-2 px-3 rounded bg-slate-200 placeholder:text-slate-500`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

export { Input };
