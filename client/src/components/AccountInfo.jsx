const AccountInfo=({account})=>{
    return <>
    <ul className="p-4 blue-glassmorphism my-4 text-xl  w-full">

    <li>{"id: "+account.id}</li>
    <li>{"balance: "+account.balance}</li>
    <li>{"public Key: "+account.publicKey}</li>
    </ul>
    </>

}
export default AccountInfo