import React from 'react';
import ReactQuill from 'react-quill'; // Import Quill if needed

export interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

const Editor = ({ ...rest }) => {
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      formats={formats}
      {...rest}
      onChange={(value, _, __, editor) => {
        rest.onChange(value, editor);
      }}
    />
  );
};

export default Editor;
