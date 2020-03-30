import React, { useState, useRef, useEffect } from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import { useField } from '@unform/core';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <div>
          {preview ? (
            <img src={preview} alt="Avatar" />
          ) : (
            <>
              <MdInsertPhoto size={53} color="#DDDDDD" />
              <span>Adicionar foto</span>
            </>
          )}

          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref}
          />
        </div>
      </label>
    </Container>
  );
}
