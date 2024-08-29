// components/CustomImage.js
import Image from 'next/image';
import PropTypes from 'prop-types';

const CustomImage = ({ src, alt, width, height, layout = 'responsive', objectFit = 'cover', className = '', ...props }) => {
    console.log(props,'p')
    return (
        <div className={`custom-image-wrapper ${className}`} style={{ width, height }}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                layout={layout}
                objectFit={objectFit}
                {...props}
            />
        </div>
    );
};

CustomImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    layout: PropTypes.oneOf(['fixed', 'intrinsic', 'responsive', 'fill']),
    objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
    className: PropTypes.string,
};

export default CustomImage;