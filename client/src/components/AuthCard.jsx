import { Input } from "./ui/Index";

export default function AuthCard() {
  return (
    <>
      <Input
        placeholder={"Hello ji"}
        type={"text"}
        onChange={(e) => console.log(e.target.value)}
      />
    </>
  );
}
