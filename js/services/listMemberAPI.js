var baseUrl = "https://629d56d03dda090f3c00c132.mockapi.io/api/Members";

// GET
function getListAPI() {
	return axios({
		url: baseUrl,
		method: "GET"
	});
}

// GET Detail
function getListDetailAPI(idMember) {
	return axios({
		url: `${baseUrl}/${idMember}`,
		method: "GET"
	});
}

// POST
function addMemberAPI(member) {
	return axios({
		url: baseUrl,
		data: member,
		method: "POST"
	});
}

// DELETE
function deleteMemberAPI(idMember) {
	return axios({
		url: `${baseUrl}/${idMember}`,
		method: "DELETE"
	});
}

// PUT
function updateMemberAPI(member) {
	return axios({
		url: `${baseUrl}/${member.id}`,
		data: member,
		method: "PUT"
	});
}
