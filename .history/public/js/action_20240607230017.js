function ConfirmStudentRegister(activityId, studentId, isConfirmed, checkboxId) {
    fetch(`/activity/confirmStudentRegister?activity_id=${activityId}&student_id=${studentId}&is_confirmed=${isConfirmed}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()
        .then(data => {
            if (response.ok) {
                console.log('Success:', data.message);
                // Cập nhật thuộc tính onchange của checkbox
                const checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.onchange = () => ConfirmStudentRegister(activityId, studentId, !isConfirmed, checkboxId);
                }
                // Cập nhật giao diện nếu cần thiết
            } else {
                console.error('Error:', data.message);
                // Xử lý lỗi tùy thuộc vào message
            }
        })
    )
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Hiển thị ảnh đã chọn trong thẻ img
            document.getElementById('avatarImg').src = e.target.result;
            // Hiển thị nút xác nhận
            document.getElementById('confirmButton').classList.remove('d-none');
        }
        reader.readAsDataURL(file);
    }
});

async function uploadAvatar() {
    const formData = new FormData();
    const fileInput = document.getElementById('avatarInput');
    
    if (fileInput.files.length > 0) {
        formData.append('avatar', fileInput.files[0]);

        try {
            const response = await fetch('/user/upload-avatar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                toastr.success('Avatar updated successfully');
                document.getElementById('avatarImg').src = result.newAvatarUrl;
                document.getElementById('confirmButton').classList.add('d-none');
            } else {
                toastr.error('Failed to update avatar');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toastr.error('An error occurred while uploading the avatar');
        }
    } else {
        toastr.warning('Please select an image file to upload');
    }
}

async function SavePost(activityId) {
    try {
      const response = await fetch(`/activity/${activityId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        toastr.success('Duyet hoạt động thành công!');
      } else {
        const errorData = await response.json();
        toastr.error(errorData.message || 'Duyet hoạt động thất bại!');
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      toastr.error('Đã xảy ra lỗi khi lưu hoạt động!');
    }
  }
  
//   async function AdminReplyPost(mod) {
//     try {
//       const response = await fetch(`/admin/activity/<%= activity.id %>/${mod}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (response.ok) {
//         toastr.success('Lưu hoạt động thành công!');
//       } else {
//         const errorData = await response.json();
//         toastr.error(errorData.message || 'Lưu hoạt động thất bại!');
//       }
//     } catch (error) {
//       console.error('Error saving activity:', error);
//       toastr.error('Đã xảy ra lỗi khi lưu hoạt động!');
//     }
//   }
  
