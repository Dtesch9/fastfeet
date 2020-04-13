export function openCamera(status) {
  return {
    type: '@camera/OPEN_CAMERA',
    status,
  };
}

export function closeCamera(status) {
  return {
    type: '@camera/CLOSE_CAMERA',
    status,
  };
}
