import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

// custome import
import "./BlogPost.css";

// custome editor component
class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange: Function = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // image: {
            //   uploadCallback: uploadImageCallBack,
            //   alt: { present: true, mandatory: true },
            // },
          }}
        />
      </div>
    );
  }
}

function BlogPost() {
  return (
    <div className="container text-center mt-5">
      <h2>React Wysiwyg Rich Editor Using Draft.js</h2>
      <EditorContainer />
    </div>
  );
}

export default BlogPost;
