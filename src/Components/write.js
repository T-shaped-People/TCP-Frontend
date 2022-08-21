import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Write()
{
    const [write, setWrite] = React.useState('');
    return(
        <div>
            <CKEditor
                editor={ClassicEditor}
                data="<p>write</p>"
                onChange={(event, editor)=>{
                    const data = editor.getData();
                    console.log({event, editor, data});
                    setWrite(data);
                }}
                onError={(error, errorInfo)=>{
                    console.log(error, errorInfo);
                }}
            />
        </div>
    )
}