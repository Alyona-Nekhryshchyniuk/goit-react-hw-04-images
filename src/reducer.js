export function reducer(modal, action) {
  switch (action.type) {
    case 'escClick':
      if (action.payload.code === 'Escape' && modal) return false;
      break;
    case 'backdropClick':
      if (!(action.payload.target === action.payload.currentTarget))
        return true;
      break;
    case 'toggle':
      return !modal;
    default:
      return modal;
  }
}
