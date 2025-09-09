import { useContext, useState } from 'react';
import Input from '../../shared/components/ui/Input';
import { UserContext } from '../../context/user/context';

export default function Send() {
	const [amount, setAmount] = useState('');
	const [toAddress, setToAddress] = useState('');
	const { paySol } = useContext(UserContext);
	return (
		<div className="flex h-full">
			<div className="flex flex-col gap-4 mt-[100px] shadow  w-[500px] h-[500px] px-10 py-20 rounded-2xl min-h-[300px]">
				<Input
					placeholder="Enter the public key"
					onChange={e => setToAddress(e.target.value)}
					type="text"
					required={true}
				/>

				<Input
					placeholder="Amount in SOL"
					type="number"
					onChange={e => setAmount(e.target.value)}
					required={true}
				/>

				<button
					className="mt-10 bg-blue-700 text-white py-3 rounded hover:bg-blue-800 cursor-pointer"
					onClick={() => {
						paySol(amount, toAddress);
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}
