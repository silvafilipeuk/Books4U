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

export const fetchGroups = async () => {
	const { data, error } = await supabase.from("groups").select();

	if (error) {
		Promise.reject(error);
	}

	return data;
};

// checks if an user belongs to a group.
// Returns true or false

export const isUserOnGroup = async (userId, groupId) => {
	const { data, error } = await supabase
		.from("users_groups")
		.select("user_id")
		.eq("user_id", userId)
		.eq("group_id", groupId);

	if (error) {
		Promise.reject(error);
	}
	return data.length ? true : false;
};
