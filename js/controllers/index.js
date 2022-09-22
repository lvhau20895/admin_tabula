showListMember();
function showListMember() {
	getListAPI()
		.then(function (response) {
			var lists = response.data;
			var show = "";
			for (var i = 0; i < lists.length; i++) {
				var member = lists[i];
				if (member.loaiND === "GV") {
					show += `
                    <div class="col-12 col-sm-6 col-lg-3 animate__animated animate__fadeIn wow" data-wow-delay="0.2s">
                        <div class="card">
                            <div class="card-image">
                                <img src="${member.hinhAnh}" class="card-img-top">
                            </div>
                            <div class="card-body">
                                <h6 class="card-sub-title">${member.ngonNgu}</h6>
                                <h3 class="card-title">${member.hoTen}</h3>
                                <p class="card-text">${member.moTa}</p>
                            </div>
                        </div>
                    </div>
                `;
				}
			}
			document.getElementById("showList").innerHTML = show;
		})
		.catch(function (error) {
			console.log(error);
		});
}