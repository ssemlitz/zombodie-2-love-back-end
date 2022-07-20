import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function create (req, res) {
  req.body.owner = req.user.profile
  console.log(req.body)
  Profile.create(req.body)
  .then(profile => {
    Profile.findById(profile._id)
    .populate("owner")
    res.json(populatedProfile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}
function update (req, res) { 
  if(req.body.age) {
    req.body.age = parseInt(req.body.age)
    req.body.height = parseInt(req.body.height)
  }
  Profile.findByIdAndUpdate(req.user.profile, req.body, {new:true})
  .then(profile => {
    // profile.species = req.body.species
    // profile.brains = req.body.brains
    // profile.prefersZombie = req.body.prefersZombie
    // profile.prefersHuman = req.body.prefersHuman
    // profile.prefersHalfbie = req.body.prefersHalfbie
    // profile.age = parseInt(req.body.age)
    // profile.height = parseInt(req.body.height)
    // profile.bio = req.body.bio
    // profile.save()
    //   .then(savedProfile => {
        res.json(profile)
      // })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  
}
function indexProfile(req, res) {
  Profile.find({})
  .populate("owner")
  .then(profiles => {
    res.json(profiles)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}
function show (req,res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  
}

export { 
  index,
  addPhoto, 
  create,
  indexProfile, 
  update, 
  show
}
