import React from "react";
import { Editor as RTE } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function Editor({control,name,defaultValue}) {
  return (
    <div className="editor" style={center}>
      <Controller 
        name={name}
        control={control}
        render={({field : {onChange}}) =>   (<RTE 
        apiKey='ze7uk64r1681upcjf645vnjv4kgy7bx53f5wkk2qvz3rogcs'
        initialValue={defaultValue}
        init={{
          // width:'600px',
          plugins: ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table  | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
        }}
        onEditorChange={onChange}
      />)}   
      />
    </div>
  );
}
const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export default Editor;
