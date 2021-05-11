import ImagePicker from 'react-native-image-crop-picker';

export function openImageCropper() {
        ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true
        }).then(image => {
                console.log(image);
        });
}