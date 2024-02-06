import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function Header() {
  return (
    <div>
      {/* 
      
      Un logo
      Le titre du site (desktop)
      Une icone utilisateur avec menu déroulant

      Une barre de navigation (mobile : en bas, desktop : en haut) avec un champ de recherche
      Récupérer l'url actuelle (hook useLocation) pour selected dans navbar 
      Navlinks
      
      */}

      <h1>Y'avait quoi avant ? </h1>
      <Navbar />
    </div>
  )
}
