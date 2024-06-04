function ConfirmStudentRegister(activityId, studentId, isConfirmed, checkboxId) {
    fetch(`http://127.0.0.1:3200/activity/confirmStudentRegister?activity_id=${activityId}&student_id=${studentId}&is_confirmed=${isConfirmed}`, {
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
