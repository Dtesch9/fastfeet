export function openCamera(status) {
  return {
    type: '@user/OPEN_CAMERA',
    status,
  };
}

export function closeCamera(status) {
  return {
    type: '@user/CLOSE_CAMERA',
    status,
  };
}
