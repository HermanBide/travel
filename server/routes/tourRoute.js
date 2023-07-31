import express from 'express'
import { createTour,updateTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controllers/tourController.js'
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//create new tour
router.post('/', verifyAdmin, createTour)
//update tour
router.put('/:id',verifyAdmin, updateTour)
//delete tour
router.delete('/:id', verifyAdmin, deleteTour)
//get all the tours
router.get('/', getAllTour)
//get single tour
router.get('/:id', verifyAdmin, getSingleTour)
//search tour
router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTours', getFeaturedTour)
router.get('/search/getTourCount', getTourCount)


export default router