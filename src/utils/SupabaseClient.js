import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tlrslrgqvxhjdajpayfb.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

// Asks the supabase server if the user is logged in.
// Returns false if the user is not logged, or user session iformation in an object otherwise.
export async function getSession() {
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		Promise.reject(error);
	}

	return data.session === null ? false : data.session.user.user_metadata;
}
