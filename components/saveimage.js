import * as MediaLibrary from 'expo-media-library';

export default saveImageToGallery = async (uri) => {
  try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
      console.log('Image saved to gallery');
    } 
  catch (error) {
    console.error('Error saving image to gallery:', error);
  }
};
