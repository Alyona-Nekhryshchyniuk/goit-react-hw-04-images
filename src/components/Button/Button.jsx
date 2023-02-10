import PropTypes from 'prop-types';
const Button = ({ loadMoreFn }) => {
  return <button onClick={() => loadMoreFn()}>Load more</button>;
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
export default Button;
