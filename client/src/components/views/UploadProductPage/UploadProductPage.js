import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from "axios";
const { TextArea } = Input;
const Continents = [
  { key: 0, value: "선택"},
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" }
]

function UploadProductPage(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    let user = props.user.userData
    // if(!Title || !Description || !Price || !Continent) {
    //   return alert('모든 값을 넣어주셔야 합니다.')
    // }
    const body = {
      writer : user._id,
      title : Title,
      description : Description,
      images : Images,
      price : Price,
      images: Images,
      continents: Continent
    }
    axios.post('/api/product', body).then((res) => {
      if(res.data.success) {
        alert('상품 업로드에 성공 했습니다.')
        props.history.push('/')
      } else {
        alert('상품 업로드에 실패 했습니다.')
      }
    })
  }
  const updateImages = (newImages) => {
    setImages(newImages)
  }
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Price, setPrice] = useState(0)
  const [Continent, setContinent] = useState(0)
  const [Images, setImages] = useState([])

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2> Product upload </h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={(e) => setTitle(e.target.value)} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea id="textarea" onChange={(e) => setDescription(e.target.value)} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={(e) => setPrice(e.target.value)} value={Price} />
        <br />
        <br />
        <select onChange={(e) => setContinent(e.target.value)} value={Continent}>
          {
            Continents.map(item => (
              <option key={item.key} value={item.key}> {item.value}</option>
            ))
          }
        </select>
        <br />
        <br />
        <button type="submit">
          확인
        </button>
      </Form>


    </div>
  )
}

export default UploadProductPage