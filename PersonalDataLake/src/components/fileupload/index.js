import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import S3FileUpload from 'react-s3';

// import S3FileUpload from 'react-s3';

// //Optional Import
// import { uploadFile } from 'react-s3';

const config = {
    bucketName: 'mydltest1',
    // dirName: 'photos', /* optional */

}

export default class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.captureFile = this.captureFile.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            file: null
        };
    }

    captureFile(e) {
        console.log(e.target.files[0]);
        this.setState(
            { file: e.target.files[0] }
        );
    }

    upload() {
        console.log(this.state.file);
        S3FileUpload
            .uploadFile(this.state.file, config)
            .then((data) => { console.log("Sucess!"); console.log(data); })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" onChange={this.captureFile} />
                    <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
          </FormText>
                </FormGroup>
                <Button onClick={this.upload}>Upload</Button>
            </div>
        );
    }
}
