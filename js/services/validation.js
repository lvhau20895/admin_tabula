function validation(id) {
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

	var isValid = true;
	// Tài khoản không để trống, không được trùng
	if (!isRequired(member.taiKhoan)) {
		isValid = false;
		document.getElementById("tb-taiKhoan").style.display = "block";
		document.getElementById("tb-taiKhoan").innerHTML =
			"Vui lòng nhập tài khoản";
	} else if (!sameValue(taiKhoan, id)) {
		isValid = false;
		document.getElementById("tb-taiKhoan").style.display = "block";
		document.getElementById("tb-taiKhoan").innerHTML =
			"Tài khoản đã được sử dụng";
	} else {
		document.getElementById("tb-taiKhoan").style.display = "none";
	}

	// Họ tên không được để trống, không chứa số và ký tự đặc biệt
	var isLetter =
		/^[a-zA-Z_ÁÀẠÃĂẮẰẶẴÂẤẦẬẪáàạáăắằặẵâấầậãĐ" + "ÉÈẸẼÊẾỀỆỄéèẹẽêếềệễ" + "ÍÌỊĨíìịĩ" + "ÓÒỌÕÔỐỒỘỖƠỚỜỢỠóòọõôốồộỗơớờợỡ" + "ÚÙỤŨƯỨỪỰỮúùụũưứừựữ" + "ÝỲỴỸýỳỵỹ\\s]+$/;
	if (!isRequired(member.hoTen)) {
		isValid = false;
		document.getElementById("tb-hoTen").style.display = "block";
		document.getElementById("tb-hoTen").innerHTML = "Vui lòng nhập họ tên";
	} else if (!isLetter.test(member.hoTen)) {
		isValid = false;
		document.getElementById("tb-hoTen").style.display = "block";
		document.getElementById("tb-hoTen").innerHTML =
			"Họ tên không chứa số và ký tự đặc biệt";
	} else {
		document.getElementById("tb-hoTen").style.display = "none";
	}

	// Mật khẩu không được để trống, dúng format (có ít nhất 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt, độ dài 6-8)
	var isPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$/;
	if(!isRequired(member.matKhau)) {
		isValid = false;
		document.getElementById("tb-matKhau").style.display = "block";
		document.getElementById("tb-matKhau").innerHTML = "Vui lòng nhập mật khẩu";
	} else if(!isPass.test(member.matKhau)) {
		isValid = false;
		document.getElementById("tb-matKhau").style.display = "block";
		document.getElementById("tb-matKhau").innerHTML = "Mật khẩu phải từ 6-8 ký tự và ít nhất 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt";
	} else {
		document.getElementById("tb-matKhau").style.display = "none";
	}

	// Email không được để trống, đúng format email
	var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!isRequired(member.email)) {
		isValid = false;
		document.getElementById("tb-email").style.display = "block";
		document.getElementById("tb-email").innerHTML = "Vui lòng nhập email";
	} else if(!isEmail.test(member.email)) {
		isValid = false;
		document.getElementById("tb-email").style.display = "block";
		document.getElementById("tb-email").innerHTML = "Email không hợp lệ";
	} else {
		document.getElementById("tb-email").style.display = "none";
	}

	// Hình ảnh không được để trống
	if(!isRequired(member.hinhAnh)) {
		isValid = false;
		document.getElementById("tb-hinhAnh").style.display = "block";
		document.getElementById("tb-hinhAnh").innerHTML = "Vui lòng nhập liên kết hình ảnh";
	} else {
		document.getElementById("tb-hinhAnh").style.display = "none";
	}

	// Loại người dùng: phải chọn
	if(!isRequired(member.loaiND)) {
		isValid = false;
		document.getElementById("tb-loaiND").style.display = "block";
		document.getElementById("tb-loaiND").innerHTML = "Vui lòng chọn loại người dùng";
	} else {
		document.getElementById("tb-loaiND").style.display = "none";
	}

	// Loại ngôn ngữ: phải chọn
	if(!isRequired(member.ngonNgu)) {
		isValid = false;
		document.getElementById("tb-ngonNgu").style.display = "block";
		document.getElementById("tb-ngonNgu").innerHTML = "Vui lòng chọn ngôn ngữ";
	} else {
		document.getElementById("tb-ngonNgu").style.display = "none";
	}

	// Mô tả không được để trống, không vượt quá 60 ký tự
	if(!isRequired(member.moTa)) {
		isValid = false;
		document.getElementById("tb-moTa").style.display = "block";
		document.getElementById("tb-moTa").innerHTML = "Vui lòng nhập mô tả";
	} else if(!checkLength(member.moTa.length, 60)) {
		isValid = false;
		document.getElementById("tb-moTa").style.display = "block";
		document.getElementById("tb-moTa").innerHTML = "Mô tả không vượt quá 60 ký tự";
	} else {
		document.getElementById("tb-moTa").style.display = "none";
	}
	return isValid;
}

// Kiểm tra input trống
function isRequired(value) {
	if (value) {
		return true;
	}
	return false;
}

// Kiểm tra độ dài value
function checkLength(value, max) {
	if (value > max) {
		return false;
	}
	return true;
}

// Kiểm tra tài khoản trùng lặp
function sameValue(value, id) {
	console.log(id);
	var flag = true;
	var newList = [];
	if(id) {
		for(var i = 0; i < lists.length; i++) {
			if(lists[i].id != id) {
				newList.push(lists[i]);
			}
		}
	} else {
		newList = lists;
	}
	for (var i = 0; i < newList.length; i++) {
		if (value === newList[i].taiKhoan) {
			flag = false;
			break;
		}
	}
	return flag;
}
