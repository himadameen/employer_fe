import React, { useState } from 'react'
import '../App.css';

const Image = () => {

  const values = {
    name : "",
    image : '',
  }
    const [val, setVal]  =useState(values);
    const [image, setImage] = useState(values.image);

  const handle = (e) => {
    setVal(e.target.value);
  }


    const upload = (e) => {
      const file = e.target.files[0];
  
      var reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = function () {
        // let compressedImg = reader.result.split('').reduce((o, c) => {
        //   if (o[o.length - 2] === c && o[o.length - 1] < 35) o[o.length - 1]++;
        //   else o.push(c, 0);
        //   return o;
        // },[]).map(_ => typeof _ === 'number' ? _.toString(36) : _).join('');

        //   setImage(compressedImg);
        //   console.log(compressedImg);
        let str= reader.result;
        const length = str.length;
        console.log(length);
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };
  
    
    // const handle = () => {

    // }

  return (
    <>
      <input  type="text" onChange={handle}/>
        <div className="container" style={{marginTop: "5%"}}>
            <input type="file" onChange={upload}/>
            <br/><br/>
            <button onChange={handle}>Submit</button>
        </div>
        <img src={image} alt='pic' />
        <img src='' alt='imgp'/>
        <div className="container-fluid">
            <img src='https://c.tenor.com/6gHLhmwO87sAAAAi/gg.gif' alt='gif' id='gif' />
        </div>
        
    </>
  )
}

export default Image;







// ----------------------------------------------------------------------------

// 1st method

// const upload = (e) => {
    //     const file = e.target.files[0];

    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     reader.onload = function () {
    //         setPhoto((reader.result));
    //         console.log(reader.result);
    //     };
    //     reader.onerror = function (error) {
    //     console.log("Error: ", error);
    //     };
    // };

// ----------------------------------------------------------------

// 2nd method

 // const imageUploaded = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if(reader.readyState === 2){
    //             // setInput((...pre) => ({...pre, profile:reader.result}));
    //             setInput({profile: reader.result});
    //         }
    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    //     // console.log(e.target.files[0]);
    //     // setInput(e.target.files[0]);
    //     // setInput((pre) => ({...pre, profile: e.target.files[0]}));
    // }

// --------------------------------------------------------------------------------