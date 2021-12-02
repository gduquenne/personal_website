const easeOutExpo = 'cubic-bezier(0.19, 1, 0.22, 1)';
const props = {
  position: 'absolute',
  content: '',
  left: 0,
  bottom: '-0.1rem',
  display: 'block',
  width: '100%',
  height: 1,
  background: 'yellow',
  transition: `1.1s ${easeOutExpo}`
};

const LINKFLASH = {
  position: 'relative',
  '&::before': {
    ...props,
    transform: 'scaleX(0)',
    transformOrigin: 'left'
  },
  '&::after': {
    ...props,
    transformOrigin: 'right',
    transitionDelay: '0.25s'
  },
  '&:hover': {
    '&::before': {
      transform: 'scaleX(1)',
      transitionDelay: '0.25s'
    },
    '&::after': {
      transform: 'scaleX(0)',
      transitionDelay: '0s'
    }
  }
};

export default LINKFLASH;
