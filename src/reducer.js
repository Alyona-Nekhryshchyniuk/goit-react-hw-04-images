export function reducer(modal, action) {
  switch (action.type) {
    case 'escClick':
      if (action.payload.code === 'Escape' && modal) return false;
    case 'backdropClick':
      if (!(action.payload.target === action.payload.currentTarget))
        return true;
    case 'toggle':
      return !modal;
  }
}
