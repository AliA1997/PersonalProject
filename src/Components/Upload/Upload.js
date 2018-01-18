import React, { Component } from 'react'
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css'
import Header from '../Header/Header';
import './Upload.css';

// const upload = require('superagent');
// import ReactUpload from 'react-s3-upload';

// const uploader = new FineUploaderTraditional({
//     options: {
//         chunking: {
//             enabled: true
//         },
//         dropzone: {
//             enabled: true,
//         },
//         deleteFile: {
//             enabled: true,
//             endpoint: '/uploads'
//         },
//         request: {
//             endpoint: '/uploads'
//         },
//         retry: {
//             enableAuto: true
//         }
//     }
// })

// const fileInputChildren = <span>Choose Files</span>

// export default class Upload extends Component {
//     render() {
//         return (
//             <div>Upload</div>
//             // <ImagesUploader
//             //     url="http://localhost:3035/notmultiple"
//             //     optimisticPreviews
//             //     multiple={false}
//             //     onLoadEnd={err=>{
//             //         if(err){
//             //             console.log(err);
//             //         }
//             //     }}
//             //     label="Upload your image" 
//             //     />
//         )
//     }
// }


   // <div>
            //     {/* <input type='file' /> */}
            //     {/* <Dropzone onDrop={this.onDrop} multiple='false'>         
            //     */}
            // </div>

    // graphql(CreateChampionMutatioUpload;

    //     onDrop = async files => {
    //         this.setState({ file: files[0]});
    //     }
        
    //     onChange = e =>{
    //         this.setState({
    //             [e.target.name]: e.target.value
    //         })
    //     }
        
    //     uploadToS3 = async (file, signedRequest) => {
    //         const options = {
    //             headers: {
    //                 "Content-Type": file.type
    //             }
    //         }
    //         await axios.put(signedRequest, file, options)
    //     }
        
    //     formatFilename = filename => {
    //         const date = date().format('YYYYMMDD');
    //         const randomString = Math.random()
    //             .toString(36)
    //             .substring(2, 7);
    //         const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    //         const newFilename = `appuploads/${date}-${randomString}-${cleanFileName}`;
    //         return newFilename.substring(0, 60);
    //     }
        
    //     submit = async () => {
    //         const {name, file} = this.state;
    //         const response = await this.props.s3Sign({
    //             variables: {
    //                 filename: this.formatFilename(file.name),
    //                 filetype: file.type
    //             }
    //         });
    //         const {signedRequest, url} = response.data.signS3;
    //         await this.uploadToS3(file, signedRequest);
        
    //         const graphqlResponse = await this.props.createChampion({
    //             variables: {
    //                 name, 
    //                 pictureUrl: url
    //             }
    //         });
        
    //         this.props.history.push(
    //             `/champion/${graphqlResponse.data.createChampion.id}`
    //         )

//     const CreateChampionMutation = gql`
//     mutation($name: String!, $pictureUrl: String!){
//         createChampion(name: $name, pictureUrl: $pictureUrl){
//             id
//         }
//     }
// `;



// const s3SignMutation = gql`
//     mutation($filename: String!, $filetype: String!){
//         signS3(filename: $filename, filetype: $filetype) {
//             url
//             signedRequest
//         }
//     }
// `;

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
          file: '',
          imagePreviewUrl: '',
          text: 'Hey',
        };
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);

    }

    _handleTextChange(e){
        this.setState({
            text: e.target.value
        })
        console.log(this.state.text)
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="display"/>);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="component">
        <Header />
        <div className="previewComponent">
            <form onSubmit={(e) => this._handleSubmit(e)}>
                <input 
                className='fileInput'
                type='file'
                onChange={(e) => this._handleImageChange(e)} />
            </form>
            <div className='imgPreview'>
            {$imagePreview} 
            </div>
            <h2 className='image-text'>{this.state.text}</h2>
            <textarea 
            placeholder='Add Image Caption Before Upload'
            className="caption"
            onChange={(e) => this._handleTextChange(e)} />
            <div className='submit'><button className="submitButton"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}>Upload Dream</button></div>
            
        </div>
        </div>
      )
    }
  }
    
export default Upload;