import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import Button from '~/components/Button';
import { colors } from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const CameraBox = styled.View`
  position: relative;
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  width: ${props => (props.cameraOn ? '375px' : '100%')};
  margin-top: -150px;
  border-radius: 6px;
`;

export const SnapButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  margin: 10px 0 13px;
  width: 62px;
  height: 62px;
  border-radius: 31px;
  position: absolute;
  bottom: 45px;
`;

export const Preview = styled.Image`
  flex: 1;
  width: 375px;
  margin-top: -65px;
  border-radius: 6px;
`;

export const SendButton = styled(Button)`
  margin: 10px 0 13px;
  width: 375px;
  background: ${colors.fastfeet};
`;
