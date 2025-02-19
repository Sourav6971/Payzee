const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} | Maintained by
        <a
          href="https://github.com/Sourav6971"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline ml-1"
        >
          @Sourav
        </a>
      </p>
    </footer>
  );
};

export default Footer;
