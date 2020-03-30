import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { hasObject, isProblem } from '~/utils/ObjectVerify';

import { ModalOverlay, Content, Info, Date, Signature } from './styles';

function Modal({ data, cleanModal }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (hasObject(data)) {
      setVisible(true);

      if (isProblem(data)) {
        setContent(data);
      } else {
        const filter = {
          address: `${data.recipient.street}, ${data.recipient.number} ${data.recipient.complement}`,
          region: `${data.recipient.city} - ${data.recipient.state}`,
          postal_code: data.recipient.postal_code,
          withdraw:
            data.dates.withdraw &&
            format(parseISO(data.dates.withdraw), 'dd/MM/yyyy', { locale: pt }),
          delivered:
            data.dates.delivered &&
            format(parseISO(data.dates.delivered), 'dd/MM/yyyy', {
              locale: pt,
            }),
          signature_url: data.recipient.signature_url,
        };

        setContent(filter);
      }
    }
  }, [data]);

  return (
    <>
      {isProblem(data) ? (
        <Content visible={visible ? 1 : 0} isProblem>
          <Info isProblem>
            <h4>Visualizar problema</h4>
            <p>{content.problem}</p>
          </Info>
        </Content>
      ) : (
        <Content visible={visible ? 1 : 0}>
          <Info>
            <h4>Informações da encomenda</h4>
            <p>{content.address}</p>
            <p>{content.region}</p>
            <p>{content.postal_code}</p>
          </Info>
          <Date>
            <h4>Datas</h4>
            <strong>
              Retirada: <span>{content.withdraw || 'pendente'}</span>
            </strong>
            <strong>
              Entrega: <span>{content.delivered || 'pendente'}</span>
            </strong>
          </Date>

          <Signature>
            {content.signature_url ? (
              <>
                <h4>Assinatura do destinatário</h4>
                <img src={content.signature_url} alt="Signature" />
              </>
            ) : (
              <strong>Não entregue</strong>
            )}
          </Signature>
        </Content>
      )}

      <ModalOverlay
        visible={visible ? 1 : 0}
        onClick={() => {
          setVisible(false);
          cleanModal({});
        }}
      />
    </>
  );
}

export default memo(Modal);

Modal.propTypes = {
  data: PropTypes.shape().isRequired,
  cleanModal: PropTypes.func.isRequired,
};
