import React from 'react'
import './home.css'
import Header from '../../components/header/Header.jsx'
import Contactus from '../../components/contactus/Contactus'
import SuccessStory from '../../components/success-stories/SuccessStory.jsx'

const Home = () => {
  return (
    <>
    <Header/>
    <SuccessStory/>
    <Contactus/>
    </>
  )
}

export default Home