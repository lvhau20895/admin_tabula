var lists = [];
main();
function main() {
	getListAPI().then(function (result) {
		lists = result.data;
		for (var i = 0; i < lists.length; i++) {
			var member = lists[i];
			lists[i] = new Member(
				member.id,
				member.taiKhoan,
				member.matKhau,
				member.hoTen,
				member.email,
				member.ngonNgu,
				member.loaiND,
				member.moTa,
				member.hinhAnh
			);
		}
		display(lists);
	});
}

function display(lists) {
	var html = "";
	for (var i = 0; i < lists.length; i++) {
		var member = lists[i];
		html += `
            <tr>
                <td>${i + 1}</td>
                <td>${member.taiKhoan}</td>
                <td>${member.matKhau}</td>
                <td>${member.hoTen}</td>
                <td>${member.email}</td>
                <td>${member.ngonNgu}</td>
                <td>${member.loaiND}</td>
                <td align="center">
                    <button class="btn-violet" data-type="edit" data-id="${
						member.id
					}" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button class="btn-orange" data-type="delete" data-id="${
						member.id
					}">Xóa</button>
                </td>
            </tr>
        `;
	}
	document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// Add
function addMember() {
	var taiKhoan = document.getElementById("TaiKhoan").value;
	var hoTen = document.getElementById("HoTen").value;
	var matKhau = document.getElementById("MatKhau").value;
	var email = document.getElementById("Email").value;
	var hinhAnh = document.getElementById("HinhAnh").value;
	var loaiND = document.getElementById("loaiNguoiDung").value;
	var ngonNgu = document.getElementById("loaiNgonNgu").value;
	var moTa = document.getElementById("MoTa").value;

	var member = new Member(
		null,
		taiKhoan,
		matKhau,
		hoTen,
		email,
		ngonNgu,
		loaiND,
		moTa,
		hinhAnh
	);

	var isValid = validation();
	if (!isValid) {
		return;
	}

	addMemberAPI(member)
		.then(function (result) {
			main();
			resetForm();
		})
		.catch(function (error) {
			console.log(error);
		});
}

// Delete
function deleteMember(idMember) {
	deleteMemberAPI(idMember)
		.then(function (result) {
			main();
		})
		.catch(function (error) {
			console.log(error);
		});
}

// Edit
function editMember(idMember) {
	document.querySelector(".modal-title").innerHTML = "Cập nhật người dùng";
	document.querySelector(".modal-footer").innerHTML = `
        <button class="btn-violet" data-type="update">Cập nhật</button>
        <button class="btn-gray" data-type="close" data-dismiss="modal">Hủy</button>
    `;

	// document.getElementById("TaiKhoan").disabled = true;

	getListDetailAPI(idMember)
		.then(function (result) {
			var member = result.data;
			document.getElementById("IdNguoiDung").value = member.id;
			document.getElementById("TaiKhoan").value = member.taiKhoan;
			document.getElementById("HoTen").value = member.hoTen;
			document.getElementById("MatKhau").value = member.matKhau;
			document.getElementById("Email").value = member.email;
			document.getElementById("HinhAnh").value = member.hinhAnh;
			document.getElementById("loaiNguoiDung").value = member.loaiND;
			document.getElementById("loaiNgonNgu").value = member.ngonNgu;
			document.getElementById("MoTa").value = member.moTa;
		})
		.catch(function (error) {
			console.log(error);
		});
}

// Update
function updateMember() {
	var id = document.getElementById("IdNguoiDung").value;
	var taiKhoan = document.getElementById("TaiKhoan").value;
	var hoTen = document.getElementById("HoTen").value;
	var matKhau = document.getElementById("MatKhau").value;
	var email = document.getElementById("Email").value;
	var hinhAnh = document.getElementById("HinhAnh").value;
	var loaiND = document.getElementById("loaiNguoiDung").value;
	var ngonNgu = document.getElementById("loaiNgonNgu").value;
	var moTa = document.getElementById("MoTa").value;

	var member = new Member(
		id,
		taiKhoan,
		matKhau,
		hoTen,
		email,
		ngonNgu,
		loaiND,
		moTa,
		hinhAnh
	);

	var isValid = validation(id);
	if (!isValid) {
		return;
	}

	updateMemberAPI(member)
		.then(function (result) {
			main();
			resetForm();
		})
		.catch(function (error) {
			console.log(error);
		});
}

function closeModal() {
	resetForm();
	document.getElementById("tb-taiKhoan").style.display = "none";
	document.getElementById("tb-hoTen").style.display = "none";
	document.getElementById("tb-matKhau").style.display = "none";
	document.getElementById("tb-email").style.display = "none";
	document.getElementById("tb-hinhAnh").style.display = "none";
	document.getElementById("tb-loaiND").style.display = "none";
	document.getElementById("tb-ngonNgu").style.display = "none";
	document.getElementById("tb-moTa").style.display = "none";
}

// Reset
function resetForm() {
	document.getElementById("TaiKhoan").value = "";
	document.getElementById("HoTen").value = "";
	document.getElementById("MatKhau").value = "";
	document.getElementById("Email").value = "";
	document.getElementById("HinhAnh").value = "";
	document.getElementById("loaiNguoiDung").value = "";
	document.getElementById("loaiNgonNgu").value = "";
	document.getElementById("MoTa").value = "";

	$("#myModal").modal("hide");
}

// DOM
document
	.getElementById("btnThemNguoiDung")
	.addEventListener("click", showModal);
function showModal() {
	document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
	document.querySelector(".modal-footer").innerHTML = `
        <button class="btn-violet" data-type="add">Thêm</button>
        <button class="btn-gray" data-type="close" data-dismiss="modal">Đóng</button>
    `;
}

document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
function handleSubmit(event) {
	var type = event.target.getAttribute("data-type");
	switch (type) {
		case "add":
			addMember();
			break;
		case "update":
			updateMember();
			break;
		case "close":
			closeModal();
		default:
			break;
	}
}

document
	.getElementById("tblDanhSachNguoiDung")
	.addEventListener("click", handleAction);
function handleAction(event) {
	var type = event.target.getAttribute("data-type");
	var id = event.target.getAttribute("data-id");
	switch (type) {
		case "delete":
			deleteMember(id);
			break;
		case "edit":
			editMember(id);
			break;
		default:
			break;
	}
}
