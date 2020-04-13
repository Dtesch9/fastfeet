export function openCamera() {
  return {
    type: '@camera/OPEN_CAMERA',
  };
}

export function closeCamera() {
  return {
    type: '@camera/CLOSE_CAMERA',
  };
}
