import PropTypes from 'prop-types';

function Rating({ value, text, color }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((el) => (
        <span>
          <i
            style={{ color: color }}
            className={
              value >= el
                ? 'fas fa-star'
                : value >= el - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: '#f7e301',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
