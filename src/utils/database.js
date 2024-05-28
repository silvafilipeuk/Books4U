import { supabase } from "../utils/SupabaseClient";

// Takes a groupId as parameter and returns an array of members objects with full_name and id
// Returns: [{name: "member1_name", id: "member1_id"}, {name: "member2_name", id: "member2_id"}]




export const fetchGroupMembers = async (groupId) => {
	const { data, error } = await supabase
		.from("profile")
		.select("full_name,id, users_groups!inner(user_id)")
		.eq("users_groups.group_id", groupId);

	if (error) {
		Promise.reject(error);
	}
	if (data) {
		const members = data.map((member) => {
			return { name: member.full_name, id: member.id };
		});

		return members;
	}
};

// Takes an user ID as parameter and returns an array of recommendations objects for that user.
// Returns: [{
// 	id: "recommendation_id",
// 	book_cover_url: "url of the book",
// 	book_id: "book_id",
// 	book_title: "title of the book",
//  	recommendation_text: "text of the recommendation"
// }, {...}, {...} ]

export const fetchUserRecommendations = async (userId) => {
	const { data, error } = await supabase
		.rpc("booksrecommendations")
		.eq("user_id", userId);

	if (error) {
		Promise.reject(error);
	}
	if (data) {
		const recommendations = data.map((recommendation, index) => {
			return {
				id: index,
				book_cover_url: recommendation.book_cover_url,
				book_id: recommendation.book_id,
				book_title: recommendation.book_title,
				recommendation_text: recommendation.recommendation_text,
			};
		});

		return recommendations;
	}
};

export const isUserOnGroup = async (userId, groupId) => {
	const { data, error } = await supabase
		.from("users_groups")
		.select("user_id")
		.eq("user_id", userId)
		.eq("group_id", groupId);

	if (error) {
		Promise.reject(error);
	}

	return data.length > 0 ? true : false;
};

// Fetches all the groups and their data from the database
//group_id, group_name, group_description

export const fetchGroups = async (setFetchError, setGroups) => {
	const { data, error } = await supabase.from("groups").select();

	if (error) {
		setFetchError("cannot fetch groups");
		setGroups(null);
	}
	if (data) {
		setGroups(data);
		setFetchError(null);
	}
};

//Fetch all the users_groups data
// user_id, group_id, id

export const fetchUsersGroupsData = async (setUsersGroupsData) => {
	const { data, error } = await supabase.from("users_groups").select("*");

	if (error) {
		return Promise.reject(error);
	}
	if (data) {
		setUsersGroupsData(data);
	}
};

// Delete a user from a group
// Parameters: (userId, groupId)
// Returns a Promise.reject with the error if fail
// Returns true if deleted.

export const deleteUserGroup = async (userId, groupId) => {
	const { error } = await supabase
		.from("users_groups")
		.delete()
		.eq("user_id", userId)
		.eq("group_id", groupId);

	if (error) {
		return Promise.reject(error);
	}

	return true;
};

// Add a user to a group
// Parameters: (userId, groupId)
// Returns a Promise.reject with the error if fail
// Returns true if added.

export const addUserGroup = async (userId, groupId) => {
	const { error } = await supabase
		.from("users_groups")
		.insert({ user_id: userId, group_id: groupId });

	if (error) {
		return Promise.reject(error);
	}

	return true;
};
