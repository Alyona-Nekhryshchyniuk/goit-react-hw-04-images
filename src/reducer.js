export function reducer(modal, action) {
  switch (action.type) {
    case 'escClick':
      if (action.payload.code === 'Escape' && modal) {
        return !modal;
      }
      break;
    case 'backdropClick':
      console.log(!(action.payload.target === action.payload.currentTarget));

      if (!(action.payload.target === action.payload.currentTarget))
        console.log('on img exactly');
      action.payload.target.style.pointerEvents = 'none';

      break;
    case 'toggle':
      console.log('ff');
      return !modal;
  }
}
