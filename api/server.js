//const express = require('express')

import express from 'express' // yeni nesil import
import cors from 'cors'
import recipeRouter from './routes/recipeRoutes.js'

const app = express();
const port = 4004

//cors hatalarını ve histeğin headerını eklemek içi
app.use(cors())

// isteğin bodydeki json verilerini ceviren işleyen mw
app.use(express.json())

//tarifler için route operasyoınlarını gerçekleştireceğimiz endpointleri tanımla
// app.route('/api/v1/recipes').get(()=>{
// json.push()
// FileSystem.readFile()
// resizeBy.json()
// }) önceden böyle yazardık ama expres old.için 
app.use(recipeRouter)

app.listen(port, () => {
    console.log(`server ${port} portunda çalışmaya başladı`)


})