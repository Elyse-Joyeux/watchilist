import express from 'express'

const router = express.Router()

// router.get('/hello', (req,res)=>{
//     res.json({message: "Hello"})
// })

// router.get('/:id', (req, res)=>{
//     res.send("All Movies")
// })
router.get('/', (req, res)=>{
    res.json({message: "httpGetMethod"})
})

router.post('/', (req, res)=>{
    res.json({message: "httpPostMethod"})
})

router.put('/', (req, res)=>{
    res.json({message: "httpPutMethod"})
})

router.delete('/', (req, res)=>{
    res.json({message: "httpDeleteMethod"})
})

export default router