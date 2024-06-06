module.exports = {
  roles: {
    ADMIN: 'admin',
    STUDENT: 'student',
    ORGANIZATION: 'organization',
  },
  static_paths: {
    IMAGES: 'public/images',
  },
  state_activity: {
    YET: 'yet',
    REJECT: 'reject',
    CONFIRM: 'confirm',
    UPDATE: 'update',
    DONE: 'done',
  },
  state: {
    yet: 'Chưa duyệt ',
    reject: 'Bài viết đã từ chối',
    confirm: 'Đã phản hồi',
    update: 'Đang chờ thay đổi',
    done: 'Đã duyệt',
  }
}
