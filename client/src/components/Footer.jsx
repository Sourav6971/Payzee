import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white  flex justify-center items-center space-x-6 py-10  bottom-0 ">
      <a
        href="https://github.com/Sourav6971"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-gray-400 transition"
      >
        <FaGithub size={20} />
        <span>@Sourav6971</span>
      </a>
      <a
        href="https://github.com/Sourav6971/payzee"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-gray-400 transition"
      >
        <FaGithub size={20} />
        <span>Create a fork</span>
      </a>
      <span className="text-sm">
        &copy; {"Copyright " + new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
