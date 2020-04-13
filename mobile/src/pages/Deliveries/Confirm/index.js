import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { openCamera, closeCamera } from '~/store/modules/camera/action';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  CameraBox,
  Camera,
  SnapButton,
  Preview,
  SendButton,
} from './styles';

export default function Confirm() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { packId } = route.params;
  const [camera, setCamera] = useState(null);
  const [fileName, setFileName] = useState('');
  const [path, setPath] = useState(null);

  StatusBar.setHidden(true);

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      setFileName(data.uri.split(/\D/).join(''));
      setPath(data.uri);
      dispatch(closeCamera());
      StatusBar.setHidden(false);
    }
  }

  async function uploadFile() {
    try {
      const data = new FormData();

      data.append('file', {
        uri: path,
        name: `${fileName}.jpg`,
        type: 'image/jpg',
      });

      const response = await api.post('files', data);

      const { id } = response.data;

      await api.put('delivery', {
        id: packId,
        signature_id: id,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Deliveries' }],
      });
    } catch (error) {
      Alert.alert('Erro inesperado', 'Erro ao enviar confirmação!');
    }
  }

  return (
    <Background>
      <Container>
        {path ? (
          <>
            <CameraBox>
              <Preview source={{ uri: path }} />

              <SnapButton
                onPress={() => {
                  dispatch(openCamera());
                  setPath(null);
                  StatusBar.setHidden(true);
                }}
              >
                <Icon name="camera-alt" size={28} color="#fff" />
              </SnapButton>
            </CameraBox>

            <SendButton onPress={uploadFile}>Enviar</SendButton>
          </>
        ) : (
          <CameraBox>
            <Camera
              cameraOn={!!path}
              ref={ref => setCamera(ref)}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.auto}
              style={{ flex: 1 }}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar câmera',
                message:
                  'Precisamos da sua permissão para utilizar a câmera do seu celular',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permissão para gravar áudio',
                message: 'Precisamos da sua permissão para utilizar o áudio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />

            <SnapButton onPress={takePicture}>
              <Icon name="camera-alt" size={28} color="#fff" />
            </SnapButton>
          </CameraBox>
        )}
      </Container>
    </Background>
  );
}
