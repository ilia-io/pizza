import ContentLoader from 'react-content-loader';

const Loader: React.FC = (props) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={490}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="140" cy="135" r="132" />
      <rect x="0" y="280" rx="10" ry="10" width="280" height="24" />
      <rect x="0" y="320" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="435" rx="10" ry="10" width="100" height="30" />
      <rect x="130" y="425" rx="30" ry="30" width="150" height="45" />
    </ContentLoader>
  );
};

export default Loader;
