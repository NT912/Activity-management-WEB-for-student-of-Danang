const { roles } = require('../constants');

const authMiddleware = module.exports;

authMiddleware.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.redirect('/auth/login');
}

authMiddleware.isLoggedOut = (req, res, next) => {
  if (!req.session.idUser) {
    return next();
  }

  return res.redirect('/');
}

authMiddleware.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === roles.ADMIN) {
    return next();
  }

  req.flash('error', 'Bạn không có quyền truy cập vào trang này');
  return res.redirect('/');
}

authMiddleware.isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === roles.STUDENT) {
    return next();
  }

  req.flash('error', 'Bạn không có quyền truy cập vào trang này');
  return res.redirect('/');
}

authMiddleware.isOrganization = (req, res, next) => {
  if (req.session.user && req.session.user.role === roles.ORGANIZATION) {
    return next();
  }

  req.flash('error', 'Bạn không có quyền truy cập vào trang này');
  return res.redirect('/');
}

authMiddleware.isOrganizationOrAdmin = (req, res, next) => {
  if (req.session.idUser && (req.session.role === roles.ORGANIZATION || req.session.role === roles.ADMIN)) {
    return next();
  }

  req.flash('error', 'Bạn không có quyền truy cập vào trang này');
  return res.redirect('/');
}
