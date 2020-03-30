function assignLabel(status) {
  const label = {
    waiting: {
      label: 'PENDENTE',
      color: '#C1BC35',
      background: '#F0F0DF',
    },
    withdrew: {
      label: 'RETIRADA',
      color: '#4D85EE',
      background: '#BAD2FF',
    },
    delivered: {
      label: 'ENTREGUE',
      color: '#2CA42B',
      background: '#DFF0DF',
    },
    canceled: {
      label: 'CANCELADA',
      color: '#DE3B3B',
      background: '#FAB0B0',
    },
  };

  return label[status];
}

function StatusFilter(started, ended, canceled) {
  const statusCondition = [
    { waiting: !started && !canceled },
    { canceled: !!canceled },
    { delivered: !!ended },
    { withdrew: !!started && !canceled && !ended },
  ];

  const status = statusCondition
    .map(conditionStatus =>
      Object.keys(conditionStatus).find(key => conditionStatus[key] === true)
    )
    .find(notNull => !!notNull);

  const statusLabel = assignLabel(status);

  return statusLabel;
}

export default StatusFilter;
