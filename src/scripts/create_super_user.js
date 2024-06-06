const readlineSync = require('readline-sync');
const userModel = require('../models/userModel');
const adminModel = require('../models/adminModel');
const { roles } = require('../constants');

const username = readlineSync.question('Nhập tên tài khoản quản trị viên: ');
const password = readlineSync.question('Nhập mật khẩu quản trị viên: ', { hideEchoBack: true });
const email = readlineSync.question('Email: ');
const phone = readlineSync.question('Số điện thoại: ');

const createSuperUser = async () => {
  try {
    var _user = await userModel.GetAdminByemail(email);

    if (_user) {
      throw new Error('Email của admin đã tồn tại');
    }

    _user = await userModel.GetOrganiAcByEmail(email);

    if (_user) {
      throw new Error('Email của admin đã tồn tại');
    }

    // Tạo người dùng mới với mật khẩu đã được hash
    const user = await userModel.create({
      username,
      password: password,
      role: roles.ADMIN,
    });

    console.log('Tài khoản quản trị viên đã được tạo!');

    // Tạo thông tin quản trị viên
    await adminModel.create({
      user_id: user.id,
      email,
      phone,
    });

    console.log('Thông tin quản trị viên đã được lưu!');
  } catch (error) {
    console.error('Đã có lỗi xảy ra:', error.message);
  } finally {
    process.exit(0);
  }
}

createSuperUser();
