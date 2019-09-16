import React from 'react'
import FileUploader from './FileUploader'

//https://malcoded.com/posts/react-file-upload/
//https://spin.atomicobject.com/2018/09/13/file-uploader-react-typescript/


interface Props {
    message: string;
  }
  
interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};

export default class Upload extends React.Component<Props, State> {

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div />
          <div className="Files" />
        </div>
        <div className="Actions" />
        <FileUploader
        message='hello'
        />
      </div>
    )
  }
}
