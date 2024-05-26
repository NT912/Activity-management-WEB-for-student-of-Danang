const pathUtils = module.exports;

pathUtils.processImagePath = (imagePath) => {
  const parts = imagePath.split('/');
  parts.shift();
  return parts.join('/');
}
