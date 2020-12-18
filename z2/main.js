const outCircle = document.querySelector('.outCircle');
const outRect = outCircle.getBoundingClientRect();

const outRadius = outRect.width / 2;
const outDotCenterX = outRect.x + outRadius;
const outDotCenterY = outRect.y + outRadius;


const innerCircle = document.createElement('div');
innerCircle.classList.add('innerCircle');
innerCircle.style.position = 'absolute';
innerCircle.style.top = 0;
innerCircle.style.left = 0;
document.body.append(innerCircle);
const innerRect = innerCircle.getBoundingClientRect();

const innerRadius = innerRect.width / 2;
const innerCenterX = outDotCenterX - innerRadius;
const innerCenterY = outDotCenterY - innerRadius;

const maxDistanceInnerCenterToOutCenter = outRadius - innerRadius;

const switcher = document.querySelector('.switcher');

const getDistance = ({ x1, x2, y1, y2 }) => {
    return Math.hypot(x1 - x2, y1 - y2);
};
const getAngle = ({ x1, x2, y1, y2 }) => {
    return Math.atan2(x1 - x2, y1 - y2);
};
const setInnerToCenter = () => {
    setInnerTo(innerCenterX, innerCenterY);
};
const setInnerTo = (newX, newY) => {
    innerCircle.style.transform = `translate(${newX - innerRadius}px, ${newY - innerRadius}px)`;
};
const setLimitedCoordsGravity = (pageX, pageY) => {
    const distanceOut = getDistance({ x1: pageX, x2: outDotCenterX, y1: pageY, y2: outDotCenterY });
    if (distanceOut <= maxDistanceInnerCenterToOutCenter) {
        setInnerTo(pageX, pageY);
        return;
    }

    const angle = getAngle({ x1: pageX, x2: outDotCenterX, y1: pageY, y2: outDotCenterY });
    const newX = outDotCenterX + maxDistanceInnerCenterToOutCenter * Math.sin(angle);
    const newY = outDotCenterY + maxDistanceInnerCenterToOutCenter * Math.cos(angle);
    setInnerTo(newX, newY);
};

const setLimitedCoordsRepulsion = (pageX, pageY) => {
    const angle = getAngle({ x1: pageX, x2: outDotCenterX, y1: pageY, y2: outDotCenterY });
    const oppositeAngle = angle - Math.PI;
    const newX = outDotCenterX + maxDistanceInnerCenterToOutCenter * Math.sin(oppositeAngle);
    const newY = outDotCenterY + maxDistanceInnerCenterToOutCenter * Math.cos(oppositeAngle);
    setInnerTo(newX, newY);
};


setInnerToCenter();

let isChecked = switcher.checked;
switcher.addEventListener('change', () => {
    isChecked = switcher.checked;
});

document.addEventListener('mousemove', (event) => {
    const { pageX, pageY } = event;
    if (isChecked) {
        setLimitedCoordsRepulsion(pageX, pageY);
    } else {
        setLimitedCoordsGravity(pageX, pageY);
    }
});
