export default function Input({
	value,
	onChange,
	placeholder,
	type,
	classProps,
	required = false,
}) {
	return (
		<input
			className={`${classProps} py-4 px-6 rounded bg-slate-100 placeholder:text-slate-500 placeholder:text-md outline-none`}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			required={required}
		/>
	);
}
