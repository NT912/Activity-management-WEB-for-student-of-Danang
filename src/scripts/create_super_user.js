const readlineSync = require('readline-sync');

const userModel = require('../models/user');
const adminModel = require('../models/admin');
const { roles } = require('../constants');

const username = readlineSync.question('Nhập tài khoản quản trị viên: ');
const password = readlineSync.question('Nhập mật khẩu quản trị viên: ', { hideEchoBack: true });
const fullname = readlineSync.question('Họ và tên: ');
const email = readlineSync.question('Email: ');
const phone = readlineSync.question('Số điện thoại: ');

const createSuperUser = async () => {
  const _user = await userModel.getByUsername(username);

  if (_user) {
    throw new Error('Tài khoản đã tồn tại');
  }
  const user = await userModel.create({
    username,
    password,
    role: roles.ADMIN,
  });

  console.log('Tài khoản quản trị viên đã được tạo!');

  await adminModel.create({
    user_id: user.id,
    fullname,
    email,
    phone,
  });

  console.log('Thông tin quản trị viên đã được lưu!');
}

createSuperUser().catch(console.error).finally(() => process.exit(0));
