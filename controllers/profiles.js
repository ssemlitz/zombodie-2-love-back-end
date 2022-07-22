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
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.species = req.body.species
    profile.brains = req.body.brains
    profile.prefersZombie = req.body.prefersZombie
    profile.prefersHuman = req.body.prefersHuman
    profile.prefersHalfbie = req.body.prefersHalfbie
    profile.age = parseInt(req.body.age)
    profile.height = parseInt(req.body.height)
    profile.bio = req.body.bio
    profile.save()
      .then(savedProfile => {
        res.json(profile)
      })
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

function liked (req, res) {
  console.log(req.params.likedId)
  console.log(req.params.id);
  Profile.findById(req.params.id)
  .then(myProfile => {
    Profile.findById(req.params.likedId)
    .then(profile => {
      myProfile.liked.push(profile)
      myProfile.save()
      .then(() => {
        res.json({myProfile:myProfile, likedProfile:profile})
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function disliked (req, res) {
  console.log(req.params.dislikedId)
  console.log(req.params.id);
  Profile.findById(req.params.id)
  .then(myProfile => {
    Profile.findById(req.params.dislikedId)
    .then(profile => {
      myProfile.disliked.push(profile)
      myProfile.save()
      .then(() => {
        res.json(myProfile)
      })
    })
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

  function deleteOne(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      if (profile._id.equals(req.user.profile)) {
        Profile.findByIdAndDelete(profile._id)
        .then(deletedProfile => {
          res.json(deletedProfile)
        })
      } else {
        res.status(401).json({err: "Not authorized!"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err: err.errmsg})
    })
  }

export { 
  index,
  addPhoto, 
  create,
  indexProfile, 
  liked,
  update, 
  show,
  disliked,
  deleteOne as delete
}
