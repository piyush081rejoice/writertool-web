export const handleSpaceKeyPress = (event) => {
  if (event.key === " " && event.target.selectionStart === 0 && event.keyCode === 32) {
    return event.preventDefault();
  }
};

export const handleEmailKeyPress = (event) => {
  if (event.key === " " ) {
    return event.preventDefault();
  }
};
