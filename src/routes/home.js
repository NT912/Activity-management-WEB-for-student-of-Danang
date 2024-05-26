const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('home', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
  });
});

module.exports = router;
