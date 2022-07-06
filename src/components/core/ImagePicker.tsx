import ImgCropPicker from 'react-native-image-crop-picker';
import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from './BottomSheet';
import {Button} from 'native-base';
import {COLORS} from 'configs';

interface Props {
  visible?: boolean;
  onDismiss?: any;
  setImageURI?: any;
  postImage?: any;
  cropperCircleOverlay?: boolean;
  postImages?: any;
}
const ImagePicker = ({
  visible,
  onDismiss,
  setImageURI,
  postImage,
  cropperCircleOverlay,
  postImages,
}: Props) => {
  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo',
    };
    ImgCropPicker.openPicker({
      options,
      cropping: true,
      cropperCircleOverlay,
    }).then(res => {
      setImageURI(res.path);
      postImages ? postImage(res.path) : null;
      onDismiss();
    });
  };
  const handleTakePhoto = () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 5000,
      maxHeight: 1000,
      mediaType: 'photo',
    };
    ImgCropPicker.openCamera({
      options,
      cropping: true,
      cropperCircleOverlay,
    })
      .then(res => {
        setImageURI(res.path);
        postImage(res.path);
        onDismiss();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <BottomSheet visible={visible} onDismiss={onDismiss}>
        <Text style={styles.uploadText}>Upload Photo</Text>
        <View style={styles.gallery}>
          <Button onPress={handleChoosePhoto} bg={COLORS.cyan}>
            Gallery
          </Button>
        </View>
        <View style={styles.camera}>
          <Button onPress={handleTakePhoto} bg={COLORS.cyan}>
            Camera
          </Button>
        </View>
      </BottomSheet>
    </>
  );
};
export default ImagePicker;

const styles = StyleSheet.create({
  uploadText: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
  gallery: {
    marginTop: 10,
  },
  camera: {
    marginTop: 12,
  },
});
